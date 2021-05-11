import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import WeatherApp from "./WeatherApp";
import WeatherData from "./mockData";

configure({ adapter: new Adapter() });

describe("WeatherApp Component", () => {
  let props;
  let wrapper;
  const currentWeatherData = WeatherData.weatherData;
  const weatherForecastData = WeatherData.forecastData;
  beforeEach(() => {
    const spy = jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    props = {
      fetchCurrentWeatherData: jest.fn().mockResolvedValue(currentWeatherData),
      fetchWeatherForecastData: jest
        .fn()
        .mockResolvedValue(weatherForecastData),
    };

    wrapper = shallow(<WeatherApp {...props} />);
  });

  it("should render WeatherApp component", () => {
    const component = shallow(<WeatherApp />);
    expect(component.getElements()).toMatchSnapshot();
  });

  it("loads the CurrentWeatherData", () => {
    expect(props.fetchCurrentWeatherData).toBeCalledTimes(0);
  });

  it("loads the WeatherForecastData", () => {
    expect(props.fetchWeatherForecastData).toBeCalledTimes(0);
  });
});
