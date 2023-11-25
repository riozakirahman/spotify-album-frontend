import React from "react";
import { Link } from "react-router-dom";
import spotify from "../../images/Spotify_Logo_RGB_Black.png";
export const Card = ({ data }) => {
  return (
    <Link
      to={data.external_urls.spotify}
      target="_blank"
      className="card__spotify-link"
    >
      <img src={spotify} className="spotify__logo"></img>
      <div className="card">
        <img src={data.images[0].url} className="card__img"></img>
        <h3>{data.name}</h3>
        <p className="card__genres">{data.genres.join(", ")}</p>
      </div>
    </Link>
  );
};
