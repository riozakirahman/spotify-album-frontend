import React, { useEffect, useState, useContext } from "react";
import { LoggedContext } from "../../contexts/LoggedContext";
import { useLocation, useNavigate } from "react-router-dom";
import SpotifyService from "../../utils/SpotifyService";
import { Card } from "../Card/Card";
import { ArtistContext } from "../../contexts/ArtistContext";
import { UserContext } from "../../contexts/UserContext";

const Main = ({
  code,
  setCode,
  token,
  setToken,
  refresh_token,
  setRefToken,
  setIsArtist,
  setIsLoading,
}) => {
  const [fetchToken, setFetchToken] = useState(false);
  const [nextPage, setNextPage] = useState();
  const location = useLocation();
  const { loggedIn, setLoggedIn } = useContext(LoggedContext);
  const { artist, setArtist } = useContext(ArtistContext);
  const { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const getQueryParam = (name) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(name);
  };

  useEffect(() => {
    const codeStore = localStorage.getItem("code");
    const error = getQueryParam("error");
    const codeParam = getQueryParam("code");
    if (!codeStore && !error) {
      if (codeParam && codeParam !== codeStore) {
        setCode(getQueryParam("code"));
        setFetchToken(true);
        localStorage.setItem("code", getQueryParam("code"));
      }
    }

    if (fetchToken) {
      SpotifyService.fetchToken(
        code,
        setLoggedIn,
        setToken,
        setRefToken,
        navigate
      );
    }
  }, [code]);
  useEffect(() => {
    setIsArtist(true);
  }, []);
  useEffect(() => {
    if (token) {
      SpotifyService.fetchArtist(
        token,
        setArtist,
        setNextPage,
        null,
        null,
        setLoggedIn,
        setIsLoading
      );
      SpotifyService.fetchProfile(token, setUser, setLoggedIn, setIsLoading);
    }
  }, [token]);

  //if token exist
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);

  useEffect(() => {
    const refToken = localStorage.getItem("reftoken");
    setRefToken(refToken);

    if (refToken) {
      const refreshInterval = 60 * 59 * 1000;

      const refreshTokenInterval = setInterval(() => {
        SpotifyService.refreshToken(refresh_token, setToken);
      }, refreshInterval);

      // Clean up the interval when the component unmounts
      return () => clearInterval(refreshTokenInterval);
    }
  }, [token]);

  useEffect(() => {
    const loggedInterval = 120 * 120 * 1000;

    const refreshLoggedInterval = setInterval(() => {
      setLoggedIn(false);
    }, loggedInterval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(refreshLoggedInterval);
  }, [loggedIn]);

  useEffect(() => {
    const error = getQueryParam("error");
    if (error === "access_denied") {
      SpotifyService.exit(
        setToken,
        setCode,
        setLoggedIn,
        setRefToken,
        navigate
      );
    }
  }, []);

  return (
    <div className="main">
      <h1 className="main__title">
        {loggedIn ? "Top Artist" : "Login First ..."}
      </h1>
      <div className="card__wrapper">
        {artist &&
          loggedIn &&
          artist.map((a) => {
            return <Card key={a.id} data={a} />;
          })}
      </div>
      {nextPage && (
        <div style={{ padding: "0 20px" }}>
          <p
            className="card__next"
            onClick={() => {
              SpotifyService.fetchArtist(
                token,
                setArtist,
                setNextPage,
                nextPage,
                artist,
                null,
                setIsLoading
              );
            }}
          >
            {">>"} Load More
          </p>
        </div>
      )}
    </div>
  );
};

export default Main;
