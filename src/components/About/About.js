import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoggedContext } from "../../contexts/LoggedContext";

const About = ({ setIsAbout }) => {
  const { loggedIn } = useContext(LoggedContext);

  useEffect(() => {
    setIsAbout(true);
  }, []);

  return (
    <div className="about">
      <h1 className="about__title">Your Spotify Top Artists</h1>
      <p className="about__description">
        You can view your most-played artist on Spotify using the Spotify API.
        log in to your Spotify account to see it!
      </p>
      <Link
        className="about__button"
        to={
          !loggedIn
            ? "https://accounts.spotify.com/authorize?response_type=code&client_id=764799e75e0a4ad1be022cc0bd785fcf&redirect_uri=https://myartist.mooo.com/artist&scope=user-top-read&show_dialog=true&state=3793644676"
            : "/artist"
        }
      >
        Your Artist
      </Link>
    </div>
  );
};

export default About;
