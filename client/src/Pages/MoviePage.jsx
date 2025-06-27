import React, { useState } from "react";
import classes from "./MoviePage.module.css";
import moviesData from "../components/movie/api/movies.api.js";
import MovieForm from "../components/movie/MovieForm/MovieForm.jsx";
import MovieList from "../components/movie/MovieList/MovieList.jsx";

const MoviePage = () => {
  const [movies, setMovies] = useState(moviesData);

  const save = (movie) => {
    setMovies([...movies, movie]);
  };

  let isAdmin = false;

  return (
    <div className={classes.moviePage}>
      <div className={`${classes.container}`}>
        {isAdmin && <MovieForm save={save} />}
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default MoviePage;
