import React from "react";
import { BsLinkedin, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import spotify from "../../images/Spotify_Logo_RGB_Black.png";
const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer__wrapperlist">
        <li className="footer__list">
          <Link className="footer__link" to={"/"}>
            About
          </Link>
        </li>
        <li className="footer__list">
          <Link className="footer__link" to={"/artist"}>
            Artist
          </Link>
        </li>
      </ul>

      <Link to={"https://open.spotify.com/"} target="_blank">
        <img src={spotify} className="spotify__logo"></img>
      </Link>
    </footer>
  );
};

export default Footer;
