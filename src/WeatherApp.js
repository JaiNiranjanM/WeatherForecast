import React, { useState, useEffect } from "react";
import WeatherData from "./mockData";
import CountryCode from "./CountryCode";

import Forecast from "./Forecast";
import "./WeatherApp.css";

function WeatherApp() {
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [countryCode, setCountryCode] = useState([]);
  const [weatherForecastData, setWeatherForecastData] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [error, setError] = useState(null);
  const WEATHER_API_KEY = "524901&appid=532d5fa2a06b1cc30182238e6835eebb";
  const LOCATION = "bengaluru,karnataka,560093";

  useEffect(() => {
    const options = {
      headers: {
        "Referrer-Policy": "origin-when-cross-origin",
        "Access-Control-Allow-Origin": "https://api.openweathermap.org",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      mode: "no-cors",
    };
    fetch(
      //api.openweathermap.org/data/2.5/weather?units=metric&q=" +
        LOCATION +
        WEATHER_API_KEY,
      options
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setCurrentWeatherData(result);
          if (result && result.cod === ("400" || "500" || "501")) {
            setCurrentWeatherData(WeatherData.weatherData);
          }
        },
        (error) => {
          setError(error);
          setCurrentWeatherData(WeatherData.weatherData);
        }
      )
      .catch(() => setCurrentWeatherData(WeatherData.weatherData));
    fetch(
      "//api.openweathermap.org/data/2.5/forecast?units=metric&" +
        LOCATION +
        "&id=" +
        WEATHER_API_KEY,
      options
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setWeatherForecastData(result);
          getForcastData(result);
          if (result && result.cod === ("400" || "500" || "501")) {
            setWeatherForecastData(WeatherData.forecastData);
            getForcastData(WeatherData && WeatherData.forecastData);
          }
        },
        (error) => {
          setError(error);
          setWeatherForecastData(WeatherData.forecastData);
          getForcastData(WeatherData && WeatherData.forecastData);
        }
      );

    setCountryCode(CountryCode);
  }, []);

  const getForcastData = (weatherForecastDetails) => {
    const availableDates =
      weatherForecastDetails &&
      weatherForecastDetails.list &&
      weatherForecastDetails.list
        .map((item) => item.dt_txt.split(" ")[0])
        .filter((value, index, self) => self.indexOf(value) === index);
    setAvailableDates(availableDates);
  };

  const getWeatherStatus = () => {
    const status = {
      description:
        currentWeatherData &&
        currentWeatherData.weather &&
        currentWeatherData.weather[0] &&
        currentWeatherData.weather[0].description,
      name:
        currentWeatherData &&
        currentWeatherData.weather &&
        currentWeatherData.weather[0] &&
        currentWeatherData.weather[0].main,
    };
    return status;
  };

  const getLogoIcon = () => {
    return (
      currentWeatherData &&
      currentWeatherData.weather &&
      currentWeatherData.weather[0] &&
      currentWeatherData.weather[0].icon
    );
  };

  const getWeatherUnit = () => {
    return (
      currentWeatherData &&
      currentWeatherData.main &&
      currentWeatherData.main.temp &&
      currentWeatherData.main.temp.toFixed(1)
    );
  };

  const getHumidity = () => {
    return (
      currentWeatherData &&
      currentWeatherData.main &&
      currentWeatherData.main.humidity
    );
  };

  const getPresure = () => {
    return (
      currentWeatherData &&
      currentWeatherData.main &&
      currentWeatherData.main.pressure
    );
  };

  const getWind = () => {
    return (
      currentWeatherData &&
      currentWeatherData.wind &&
      currentWeatherData.wind.speed
    );
  };

  const getLocation = () => {
    const country =
      currentWeatherData &&
      currentWeatherData.sys &&
      currentWeatherData.sys.country
        ? currentWeatherData.sys.country.toLowerCase()
        : "";
    const countryCodeData =
      countryCode && countryCode.filter((cntry) => cntry.code === country);
    const location = {
      city: currentWeatherData && currentWeatherData.name,
      countryCode: country,
      countryName:
        countryCodeData && countryCodeData[0] && countryCodeData[0].name,
    };

    return location;
  };

  return (
    <div className="app">
      {error ? (
        <div>API ERROR - Fetching the data from STATIC request</div>
      ) : (
        <div></div>
      )}
      <div className="today-weather-container">
        <div className="weather-image">
          <img
            src={
              getLogoIcon()
                ? `http://openweathermap.org/img/wn/${getLogoIcon()}@2x.png`
                : ""
            }
            alt="status-logo"
          />
          <div>{getWeatherStatus().description}</div>
        </div>

        <div className="main-temp">
          <div className="main-temp-degree">{getWeatherUnit()}</div>
          <div className="main-temp-measure">°C</div>
        </div>
        <div className="main-temp-extras">
          <div>Humidity: {getHumidity()}%</div>
          <div>Pressure: {getPresure()} Pa</div>
          <div>Wind: {getWind()} mph</div>
        </div>
        <div className="main-temp-loc">
          <div>
            {getLocation().city}, {getLocation().countryName}
          </div>
          <div className="main-temp-loc-status">{getWeatherStatus().name}</div>
        </div>
      </div>

      <div className="nextdays-weather-container">
        {availableDates &&
          availableDates.map((data, index) => {
            return (
              <Forecast
                availableDates={data}
                forecastData={weatherForecastData}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default WeatherApp;
