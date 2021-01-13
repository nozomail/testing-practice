import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListItem from "./ListItem";

describe("ListItem", () => {
  const item = {
    idDrink: "12564",
    strAlcoholic: "Non alcoholic",
    strDrink: "Apple Karate",
    strInstructions: "Place all ingredients in the blender jar - cover and whiz on medium speed until well blended. Pour in one tall, 2 medium or 3 small glasses and drink up.",
    strIngredients: ["Carrot"],
  };

  test("matches snapshot", () => {
    const { asFragment } = render(<ListItem {...item} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("shows item's name and alcoholic or non alcoholic", () => {
    render(<ListItem {...item} />);

    expect(screen.getByText(/Apple Karate/i)).toBeInTheDocument();
    expect(screen.getByText(/Non alcoholic/i)).toBeInTheDocument();
  });

  test("does not show neither ingredients nor instructions", () => {
    render(<ListItem {...item} />);

    expect(screen.queryByText(/Ingredients:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Carrot/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Place all ingredients/i)).not.toBeInTheDocument();
  });

  test("shows ingredients and instructions when clicked", () => {
    render(<ListItem {...item} />);

    userEvent.click(screen.getByRole("listitem"));

    expect(screen.getByText(/Ingredients:/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrot/i)).toBeInTheDocument();
    expect(screen.getByText(/Place all ingredients/i)).toBeInTheDocument();
  });

  test("hides ingredients and instructions when clicked again", () => {
    render(<ListItem {...item} />);

    const target = screen.getByRole("listitem");
    userEvent.click(target);
    userEvent.click(target);

    expect(screen.queryByText(/Ingredients:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Carrot/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Place all ingredients/i)).not.toBeInTheDocument();
  });
});
