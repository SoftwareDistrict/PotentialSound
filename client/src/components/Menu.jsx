import React from "react";
import { IconButton } from "@material-ui/core";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import { menuStyles } from "../styles/styles.js";

const Menu = () => {
  const classes = menuStyles();

  const toggleMenu = () => {
    const nav = document.getElementById("mySidenav");
    const menu = document.getElementById("menu");
    if (nav.style.display === "block") {
      nav.style.display = "none";
      menu.style.display = "block";
    } else {
      nav.style.display = "block";
      menu.style.display = "none";
    }
  };

  // window.addEventListener("click", function (e) {
  //   const nav = document.getElementById("mySidenav");
  //   const menu = document.getElementById("menu");
  //   if (document.getElementById("mySidenav").contains(e.target) || menu.contains(e.target)) {
  //     console.info("");
  //   } else {
  //     nav.style.display = "none";
  //     menu.style.display = "block";
  //   }
  // });

  return (
    <IconButton id="menu" onClick={toggleMenu} className={classes.button}>
      <MenuOutlinedIcon className={classes.icon} />
    </IconButton>
  );
};

export default Menu;
