import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Item from "./Item";

describe("Item", () => {
  const item1 = {
    idDrink: "12564",
    strAlcoholic: "Non alcoholic",
    strDrink: "Apple Karate",
    strInstructions: "Place all ingredients in the blender jar - cover and whiz on medium speed until well blended. Pour in one tall, 2 medium or 3 small glasses and drink up.",
    strIngredients: ["Carrot"],
  };
  const item2 = {
    idDrink: "11046",
    strAlcoholic: "Alcoholic",
    strDrink: "Applecar",
    strInstructions: "Shake all ingredients with ice, strain into a cocktail glass, and serve.",
    strIngredients: ["Applejack", "Triple sec", "Lemon juice"],
  };

  test("matches snapshot", () => {
    const { asFragment } = render(<Item {...item1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("shows item's name without alcoholic icon", () => {
    render(<Item {...item1} />);

    expect(screen.getByText(/Apple Karate/i)).toBeInTheDocument();
    expect(screen.queryByTestId("alcoholic")).not.toBeInTheDocument();
  });

  test("shows item's name with alcoholic icon", () => {
    render(<Item {...item2} />);

    expect(screen.getByText(/Applecar/i)).toBeInTheDocument();
    expect(screen.queryByTestId("alcoholic")).toBeInTheDocument();
  });

  test("does not show neither ingredients nor instructions", () => {
    render(<Item {...item1} />);

    expect(screen.queryByText(/Ingredients:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Carrot/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Place all ingredients/i)).not.toBeInTheDocument();
  });

  test("shows ingredients and instructions when clicked", () => {
    render(<Item {...item1} />);

    userEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/Ingredients:/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrot/i)).toBeInTheDocument();
    expect(screen.getByText(/Place all ingredients/i)).toBeInTheDocument();
  });

  test("hides ingredients and instructions when clicked again", () => {
    render(<Item {...item1} />);

    const target = screen.getByRole("button");
    userEvent.click(target);
    userEvent.click(target);

    expect(screen.queryByText(/Ingredients:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Carrot/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Place all ingredients/i)).not.toBeInTheDocument();
  });
});
