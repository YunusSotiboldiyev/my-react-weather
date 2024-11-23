import React, { useState } from "react";
import "./styles.css";

const Myview = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [city, setCity] = useState("");

  const getWeatherData = () => {
    const APIKey = "99812e694d4adc260232061b311da07c";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
      .then((response) => {
        if (!response.ok) {
          setError(true);
          setWeatherData(null);
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setWeatherData(null);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getWeatherData();
    }
  };

  const getWeatherImage = (condition) => {
    switch (condition) {
      case "Clear":
        return "/img/clear.png";
      case "Rain":
        return "/img/rain.jfif";
      case "Snow":
        return "/img/snow.jfif";
      case "Clouds":
        return "/img/my-cloud.jfif";
      case "Mist":
      case "Haze":
        return "/img/mist.jfif";
      default:
        return "/img/cloud.jfif";
    }
  };

  const renderWeather = () => {
    if (weatherData) {
      const { main, weather } = weatherData;
      const imageSrc = getWeatherImage(weather[0].main);

      return (
        <div className="weather-box active">
          <div className="box">
            <div className="info-weather">
              <div className="weather">
                <img src={imageSrc} alt={weather[0].main} />
                <p className="temperature">
                  {Math.round(main.temp)}
                  <span>°C</span>
                </p>
                <p className="weather-title">{weather[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <div className="search-box">
        <i className="fa-solid fa-location-dot"></i>
        <input
          type="text"
          placeholder="Enter your location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={getWeatherData}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {renderWeather()}

      {weatherData && !error && (
        <div className="weather-detaile active">
          <div className="humidity">
            <i className="fa-solid fa-water"></i>
            <div className="text">
              <div className="info-humidity">
                <span>{weatherData.main.humidity}%</span>
              </div>
              <p>Humidity</p>
            </div>
          </div>
          <div className="wind">
            <i className="fa-solid fa-wind"></i>
            <div className="text">
              <div className="info-wind">
                <span>{Math.round(weatherData.wind.speed)} km/h</span>
              </div>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="not-found active">
          <div className="box">
            <img src="/img/not.jfif" alt="Not Found" />
            <p>Ooops! Location not found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myview;
