import React, { useState } from "react";
import classes from "./MovieList.module.css";
import moviesData from "./movies.api.js";
import MovieItem from "./MovieItem.jsx";
import MyButton from "../UI/button/MyButton.jsx";
import MyInput from "../UI/input/MyInput.jsx";

const MovieList = () => {
  const [movies, setMovies] = useState(moviesData);
  const [movie, setMovie] = useState({
    name: "",
    description: "",
    rating: 0,
  });

  const createMovie = () => {
    const newMovie = {
      id: Date.now(),
      ...movie,
    };
    setMovies([...movies, newMovie]);
    setMovie({ name: "", description: "", rating: 0 });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form className={classes.form}>
          <div className={classes.formInputs}>
            <MyInput
              type="text"
              placeholder="name"
              value={movie.name}
              onChange={(e) => setMovie({ ...movie, name: e.target.value })}
            />
            <MyInput
              type="text"
              placeholder="description"
              value={movie.description}
              onChange={(e) =>
                setMovie({ ...movie, description: e.target.value })
              }
            />
            <MyInput
              type="text"
              placeholder="rating"
              value={movie.rating}
              onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
            />
          </div>

          <MyButton
            type="button"
            onClick={createMovie}
            style={{ minWidth: "150px" }}
          >
            Создать
          </MyButton>
        </form>
      </div>

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
