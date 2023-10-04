import React from "react";
import { BsLinkedin, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer__wrapperlist">
        <li className="footer__list">
          <a className="footer__link">About</a>
        </li>
        <li className="footer__list">
          <a className="footer__link">Album</a>
        </li>
      </ul>
      <ul className="footer__wrapperlist">
        <li className="footer__list">
          <Link
            className="footer__link footer__link_socmed"
            to={"https://www.linkedin.com/in/rio-zakirahman/"}
            target="_blank"
          >
            <BsLinkedin />
          </Link>
        </li>
        <li className="footer__list">
          <Link
            className="footer__link footer__link_socmed"
            to={"https://www.instagram.com/riozakirahman08/"}
            target="_blank"
          >
            <BsInstagram />
          </Link>
        </li>
      </ul>
      <div>
        <p>
          <span>Copyright</span> &copy; Rio Zakirahman
        </p>
      </div>
    </footer>
  );
};

export default Footer;
