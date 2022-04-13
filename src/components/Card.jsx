import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({ min, max, name, img, onClose, id }) {
  return (
    <div className="cardContainer">
      <button className="boton" onClick={onClose}>
        X
      </button>
      <Link to={`/ciudad/${id}`}>
        <h2>{name}</h2>
        <section className="temp">
          <div>
            <p>Min</p>
            <p>{min}°</p>
          </div>
          <div>
            <p>Max</p>
            <p>{max}°</p>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${img}@2x.png`}
            alt="estado del clima"
          />
        </section>
      </Link>
    </div>
  );
}
