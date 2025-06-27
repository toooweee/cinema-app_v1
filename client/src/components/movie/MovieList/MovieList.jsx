import React from "react";
import classes from "./MovieList.module.css";
import MovieItem from "../MovieItem/MovieItem.jsx";

const MovieList = ({ movies }) => {
  return (
    <div>
      <h2 className={classes.title}>Рекомендации</h2>
      <div className={classes.list}>
        {movies.map((movie) => (
          <MovieItem movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
