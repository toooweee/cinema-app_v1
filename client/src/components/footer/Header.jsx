import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
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
        <button>Выйти</button>
      </div>
    </header>
  );
};

export default Header;
