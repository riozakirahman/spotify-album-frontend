import React from "react";
import { Link } from "react-router-dom";
export const Card = ({ data }) => {
  return (
    <div className="card">
      <img src={data.images[0].url} className="card__img"></img>
      <h3>{data.name}</h3>
      <p className="card__genres">{data.genres.join(", ")}</p>
      <Link
        to={data.external_urls.spotify}
        className="card__more"
        target="_blank"
      >
        More Detail
      </Link>
    </div>
  );
};
