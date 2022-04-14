import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "../components/Nav.jsx";
import Cards from "../components/Cards.jsx";
import { Route } from "react-router-dom";
import Ciudad from "../components/Ciudad";

const apiKey = "26e5f6d7f805f846ab75fa7c2fbfd476";

function App() {
  const [cities, setCities] = useState([]);

  function onClose(id) {
    const citiesLocalStorage = localStorage.getItem("cities")
      ? JSON.parse(localStorage.getItem("cities"))
      : [];
    const index = citiesLocalStorage?.findIndex((e) => e.id === id);
    if (index !== -1) {
      citiesLocalStorage.splice(index, 1);
      localStorage.setItem("cities", JSON.stringify(citiesLocalStorage));
    }
    setCities(citiesLocalStorage);
  }

  useEffect(() => {
    const citiesLocalStorage = localStorage.getItem("cities")
      ? JSON.parse(localStorage.getItem("cities"))
      : [];

    if (citiesLocalStorage.length) {
      for (let i = 0; i < citiesLocalStorage.length; i++) {
        console.log(citiesLocalStorage[i].name);
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${citiesLocalStorage[i].name}&appid=${apiKey}&units=metric&lang=es`
        )
          .then((r) => r.json())
          .then((recurso) => {
            if (recurso.main !== undefined) {
              citiesLocalStorage[i] = {
                ...citiesLocalStorage[i],
                min: Math.round(recurso.main.temp_min),
                max: Math.round(recurso.main.temp_max),
                humidity: recurso.main.humidity,
                pressure: recurso.main.pressure,
                feels_like: recurso.main.feels_like,
                img: recurso.weather[0].icon,
                wind: recurso.wind.speed,
                temp: Math.round(recurso.main.temp),
                weather: recurso.weather[0].main,
                description: recurso.weather[0].description,
                clouds: recurso.clouds.all,
              };
            }
          });
        setCities((oldCities) => [...oldCities, citiesLocalStorage[i]]);
      }
      localStorage.setItem("cities", JSON.stringify(citiesLocalStorage));
      // setCities(citiesLocalStorage);
    } else {
      localStorage.setItem("cities", JSON.stringify([]));
    }
  }, []);

  function onSearch(ciudad) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`
    )
      .then((r) => r.json())
      .then((recurso) => {
        if (recurso.main !== undefined) {
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            humidity: recurso.main.humidity,
            pressure: recurso.main.pressure,
            feels_like: recurso.main.feels_like,
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: Math.round(recurso.main.temp),
            name: recurso.name,
            weather: recurso.weather[0].main,
            description: recurso.weather[0].description,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon,
          };

          const citiesLocalStorage = localStorage.getItem("cities")
            ? JSON.parse(localStorage.getItem("cities"))
            : [];

          const index = citiesLocalStorage?.findIndex(
            (e) => e.id === ciudad.id
          );

          if (index !== -1) {
            citiesLocalStorage[index] = {
              ...citiesLocalStorage[index],
              min: Math.round(ciudad.min),
              max: Math.round(ciudad.max),
              humidity: ciudad.humidity,
              pressure: ciudad.pressure,
              feels_like: ciudad.feels_like,
              img: ciudad.img,
              wind: ciudad.wind.speed,
              temp: Math.round(ciudad.temp),
              weather: ciudad.weather,
              description: ciudad.description,
              could: ciudad.could,
            };
          } else {
            citiesLocalStorage.push(ciudad);
            setCities((oldCities) => [...oldCities, ciudad]);
          }

          localStorage.setItem("cities", JSON.stringify(citiesLocalStorage));
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }

  function onFilter(ciudadId) {
    let ciudad = cities.filter((c) => c.id === parseInt(ciudadId));
    if (ciudad.length > 0) {
      return ciudad[0];
    } else {
      return null;
    }
  }

  return (
    <div className="App">
      <Route path="/" render={() => <Nav onSearch={onSearch} />} />
      <Route
        exact
        path="/"
        render={() => <Cards cities={cities} onClose={onClose} />}
      />
      <Route
        exact
        path="/ciudad/:ciudadId"
        render={({ match }) => (
          <Ciudad city={onFilter(match.params.ciudadId)} />
        )}
      />
    </div>
  );
}

export default App;
