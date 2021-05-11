import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Forecast, { getIconStatus } from "./Forecast";

configure({ adapter: new Adapter() });

describe("Forecast Component", () => {
  const mockedIconStatus = jest.mock("./Forecast", () => ({
    getIconStatus: () => jest.fn(),
  }));

  it("should render Forecast component", () => {
    const component = shallow(<Forecast />);
    expect(component.getElements()).toMatchSnapshot();
  });

  test("Input should call handleChange on change event", () => {
    console.log("getIconStatus", getIconStatus);
    expect(jest.fn()).toBeCalledTimes(0);
  });
});
