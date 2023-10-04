import React, { useState, useContext, useEffect } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { NavLink, Link } from "react-router-dom";
import { LoggedContext } from "../../contexts/LoggedContext";
import { UserContext } from "../../contexts/UserContext";
import SpotifyService from "../../utils/SpotifyService";
import { useNavigate } from "react-router-dom";
const Header = ({
  code,
  setCode,
  token,
  setToken,
  refresh_token,
  setRefToken,
  isArtist,
  isAbout,
}) => {
  const { loggedIn, setLoggedIn } = useContext(LoggedContext);
  const { user, setUser } = useContext(UserContext);
  const [isCollapse, setIsCollapse] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const retrievedDataString = localStorage.getItem("user");
    const retrievedData = JSON.parse(retrievedDataString);
    if (retrievedData) {
      setUser(retrievedData);
    }
  }, []);

  return (
    <div className="header">
      <h4 className="header__logo">My Spotify Artists</h4>
      <div className="header__navigation">
        <ul className="header__wrapperlist">
          <li className="header__list">
            <NavLink className="header__link" to={"/"}>
              About
            </NavLink>
            {isAbout && <hr className="header__hr" />}
          </li>
          <li className="header__list">
            <NavLink className="header__link" to={"/artist"}>
              Album's
            </NavLink>
            {isArtist && <hr className="header__hr" />}
          </li>
        </ul>
        {!loggedIn ? (
          <Link
            className="header__button"
            to="https://accounts.spotify.com/authorize?response_type=code&client_id=764799e75e0a4ad1be022cc0bd785fcf&redirect_uri=http://localhost:3000/artist&scope=user-top-read&show_dialog=true&state=3793644676"
          >
            Login
          </Link>
        ) : (
          <div
            className={`header__user ${
              isCollapse ? "header__user_collapse" : ""
            }`}
          >
            <img
              className="header__user-logo"
              src={loggedIn && user && user.images[0].url}
            ></img>
            <p>{loggedIn && user && user.display_name}</p>
          </div>
        )}
        {loggedIn && (
          <p
            className="header__logout"
            onClick={() => {
              SpotifyService.exit(
                setToken,
                setCode,
                setLoggedIn,
                setRefToken,
                navigate
              );
            }}
          >
            Logout
          </p>
        )}
      </div>
      {!loggedIn && (
        <Link
          className="header__login"
          to="https://accounts.spotify.com/authorize?response_type=code&client_id=764799e75e0a4ad1be022cc0bd785fcf&redirect_uri=http://localhost:3000/artist&scope=user-top-read&show_dialog=true&state=3793644676"
        >
          Login
        </Link>
      )}

      <div
        className="header__hamburger"
        onClick={() => setIsCollapse(!isCollapse)}
      >
        <span
          className={`header__line ${isCollapse ? "header__line_active" : ""}`}
        />
        <span
          className={`header__line ${isCollapse ? "header__line_active" : ""}`}
        />
        <span
          className={`header__line ${isCollapse ? "header__line_active" : ""}`}
        />
      </div>
      {isCollapse && <Navigation isAbout={isAbout} isArtist={isArtist} />}
    </div>
  );
};

export default Header;
