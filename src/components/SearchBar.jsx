import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    let cuidad;
    console.log(city[city.length - 1]);
    if (city[city.length - 1] === " ") {
      cuidad = city.substring(0, city.length - 1);
    } else {
      cuidad = city;
    }
    onSearch(cuidad);
    setCity("");
  };

  return (
    <form className="searchContainer" onSubmit={handleSearch}>
      <input
        className="inputSearch"
        type="text"
        placeholder="Ciudad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input className="btnSearch" type="submit" value="Buscar" />
    </form>
  );
}
