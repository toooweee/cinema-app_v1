import React, { useState } from "react";
import classes from "./MovieForm.module.css";
import MyInput from "../../UI/input/MyInput.jsx";
import MyButton from "../../UI/button/MyButton.jsx";

const MovieForm = ({ save }) => {
  const [movie, setMovie] = useState({
    name: "",
    description: "",
    rating: "",
  });

  const create = () => {
    const newMovie = { id: Date.now(), ...movie };
    save(newMovie);
    setMovie({ name: "", description: "", rating: "" });
  };

  return (
    <form className={classes.form}>
      <div className={classes.formInputs}>
        <MyInput
          type="text"
          placeholder="Название"
          value={movie.name}
          onChange={(e) =>
            setMovie({
              ...movie,
              name: e.target.value,
            })
          }
        />
        <MyInput
          type="text"
          placeholder="Описание"
          value={movie.description}
          onChange={(e) =>
            setMovie({
              ...movie,
              description: e.target.value,
            })
          }
        />
        <MyInput
          type="text"
          placeholder="Рейтинг"
          value={movie.rating}
          onChange={(e) =>
            setMovie({
              ...movie,
              rating: e.target.value,
            })
          }
        />
      </div>

      <MyButton type="button" style={{ minWidth: "150px" }} onClick={create}>
        Создать
      </MyButton>
    </form>
  );
};

export default MovieForm;
