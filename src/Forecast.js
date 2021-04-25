import React from "react";

import "./Forecast.css";

function Forecast(props) {
  const getFormatedData = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(props.availableDates);
    return `${days[date.getDay()]} ${date.getDate()}`;
  };

  const getWeatherForecastData = () => {
    const forecastArrayData = [];
    props.forecastData &&
      props.forecastData.list.filter((weather) => {
        if (
          weather &&
          weather.dt_txt &&
          weather.dt_txt.indexOf(props.availableDates) >= 0
        ) {
          forecastArrayData.push(weather);
        }
        return weather;
      });

    return forecastArrayData;
  };

  const selectedForecastArray = getWeatherForecastData();

  const getTime = (forecast) => {
    let finalTime = "";
    const time = forecast && forecast.dt_txt ? forecast.dt_txt : "";
    if (time) {
      const date = new Date(time);
      finalTime = date.getHours();
    }
    return finalTime === 0
      ? `12 am`
      : finalTime < 12
      ? `${finalTime} am`
      : finalTime > 12
      ? `${finalTime - 12} pm`
      : `${finalTime} pm`;
  };

  const getMinMaxTemp = (forecast) => {
    const minMaxTemperature = {
      minTemp:
        forecast && forecast.main && forecast.main.temp_min
          ? forecast.main.temp_min
          : "",
      maxTemp:
        forecast && forecast.main && forecast.main.temp_max
          ? forecast.main.temp_max
          : "",
    };
    return minMaxTemperature;
  };

  const getIconStatus = (forecast) => {
    return (
      forecast &&
      forecast.weather &&
      forecast.weather[0] &&
      forecast.weather[0].icon
    );
  };

  return (
    <div className="next-date-details-cont">
      <div className="date-details">{getFormatedData()}</div>
      <div className="weather-daily-details">
        {selectedForecastArray.map((forecast) => {
          return (
            <div className="details-data">
              <div className="details-time">{getTime(forecast)}</div>
              <div className="details-day">
                <img
                  src={`http://openweathermap.org/img/wn/${getIconStatus(
                    forecast
                  )}@2x.png`}
                  alt=""
                />
              </div>
              <div className="details-temp">
                <div>{getMinMaxTemp(forecast).minTemp.toFixed(1)}°C</div>
                <div className="details-temp-mid"> | </div>
                <div>{getMinMaxTemp(forecast).maxTemp.toFixed(1)}°C</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
