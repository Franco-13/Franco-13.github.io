import React from "react";
import "./Ciudad.css";
import { Link } from "react-router-dom";

export default function Ciudad({ city }) {
  return (
    <section className="ciudad">
      <div className="containerCiudad">
        <Link to="/" className="goHome">
          Home
        </Link>
        <div className="infoCity">
          <h2>{city?.name}</h2>
          <article className="inf">
            <p className="infoClima">Temperatura actual: {city?.temp} ºC</p>
            <p className="infoClima">
              Sensación térmica: {city?.feels_like} ºC
            </p>
            <p className="infoClima">Clima: {city?.description}</p>
            <p className="infoClima">Viento: {city?.wind} km/h</p>
            <p className="infoClima">Cantidad de nubes: {city?.clouds}%</p>
            <p className="infoClima">Presión: {city?.pressure} hPa</p>
            <p className="infoClima">Humedad: {city?.humidity}%</p>
          </article>
        </div>
      </div>
    </section>
  );
}
