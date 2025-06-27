import React from "react";
import classes from "./Header.module.css";
import MyButton from "../UI/button/MyButton.jsx";

const Header = () => {
  return (
    <header className={`${classes.header} ${classes.container}`}>
      <img alt="logo" />
      <nav>
        <ul className={classes.headerNav}>
          <li className={classes.headerNavList}>
            <a className={classes.headerNavItem} href="">
              Home
            </a>
          </li>
          <li className={classes.headerNavList}>
            <a className={classes.headerNavItem} href="">
              Рекомендации
            </a>
          </li>
          <li className={classes.headerNavList}>
            <a className={classes.headerNavItem} href="">
              Контакты
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <MyButton>Выйти</MyButton>
      </div>
    </header>
  );
};

export default Header;
