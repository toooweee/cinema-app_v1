import React from "react";
import classes from "./MovieItem.module.css";

const MovieItem = ({ movie }) => {
  const { name, description, rating } = movie;
  return (
    <div className={classes.movieItem}>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <p className={classes.ratingContainer}>
        Рейтинг: <strong>{rating}</strong>
      </p>
    </div>
  );
};

export default MovieItem;
