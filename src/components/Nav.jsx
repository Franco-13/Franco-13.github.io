import React from "react";
import Logo from "../img/logoHenry.png";
import SearchBar from "./SearchBar.jsx";
import "./Nav.css";

//importo Link
import { Link } from "react-router-dom";

function Nav({ onSearch }) {
  return (
    <nav className="navContainer">
      {/* genero el link para volver a la home */}
      <Link className="aBtn henryBtn" to="/">
        <span>Weather App</span>
        <img className="logoHenry" id="logoHenry" src={Logo} alt="Logo Henry" />
      </Link>
      <SearchBar onSearch={onSearch} />
    </nav>
  );
}

export default Nav;
