import React, { useState, useContext } from "react";
import { LoggedContext } from "../../contexts/LoggedContext";
import { NavLink } from "react-router-dom";
const Navigation = ({ isAbout, isArtist }) => {
  const { loggedIn } = useContext(LoggedContext);
  return (
    <ul
      className={`header__wrapperlist header__wrapperlist_mobile ${
        !loggedIn ? "header__wrapperlist_mobile_collapse" : ""
      }`}
    >
      <li className="header__list header__list_mobile">
        <NavLink className="header__link" to={"/"}>
          About
        </NavLink>
        {isAbout && <hr className="header__hr" />}
      </li>
      <li className="header__list header__list_mobile">
        <NavLink className="header__link" to={"/artist"}>
          Album's
        </NavLink>
        {isArtist && <hr className="header__hr" />}
      </li>
    </ul>
  );
};

export default Navigation;
