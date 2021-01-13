import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";

describe("Filter", () => {
  test("renders all filter items checked", () => {
    const setfilters = jest.fn();
    const filters = {
      isAlcoholic: true,
      isNonAlcoholic: true,
    };

    render(<Filter filters={filters} setfilters={setfilters} />);

    const filter1 = screen.getByRole("checkbox", { name: "Alcoholic" });
    const filter2 = screen.getByRole("checkbox", { name: "Non Alcoholic" });

    expect(filter1).toBeInTheDocument();
    expect(filter2).toBeInTheDocument();
    expect(filter1).toBeChecked();
    expect(filter2).toBeChecked();
  });

  test("calls setfilter with proper args when Alcoholic filter is clicked", () => {
    const setfilters = jest.fn();
    const filters = {
      isAlcoholic: true,
      isNonAlcoholic: true,
    };

    render(<Filter filters={filters} setfilters={setfilters} />);

    const filter1 = screen.getByRole("checkbox", { name: "Alcoholic" });

    userEvent.click(filter1);

    expect(setfilters).toBeCalledWith({
      isAlcoholic: false,
      isNonAlcoholic: true,
    });
    expect(setfilters).toHaveBeenCalledTimes(1);
  });

  test("calls setfilter with proper args when Non Alcoholic filter is clicked", () => {
    const setfilters = jest.fn();
    const filters = {
      isAlcoholic: true,
      isNonAlcoholic: true,
    };
    render(<Filter filters={filters} setfilters={setfilters} />);
    const filter1 = screen.getByRole("checkbox", { name: "Non Alcoholic" });

    userEvent.click(filter1);

    expect(setfilters).toBeCalledWith({
      isAlcoholic: true,
      isNonAlcoholic: false,
    });
    expect(setfilters).toHaveBeenCalledTimes(1);
  });
});
