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
// {
//   idDrink: "11046",
//   strAlcoholic: "Alcoholic",
//   strDrink: "Applecar",
//   strInstructions: "Shake all ingredients with ice, strain into a cocktail glass, and serve.",
//   strIngredients: ["Triple sec", "Lemon juice"],
// },
// {
//   idDrink: "16311",
//   strAlcoholic: "Alcoholic",
//   strDrink: "Applejack",
//   strInstructions: "Add all ingredients into mixing glass, chill and strain into cocktail glass",
//   strIngredients: ["Midori melon liqueur", "Sour mix"],
// },
// {
//   idDrink: "12564",
//   strAlcoholic: "Non alcoholic",
//   strDrink: "Apple Karate",
//   strInstructions: "Place all ingredients in the blender jar - cover and whiz on medium speed until well blended. Pour in one tall, 2 medium or 3 small glasses and drink up.",
//   strIngredients: ["Carrot"],
// },
// { idDrink: "16289", strAlcoholic: "Alcoholic", strDrink: "Apple Grande", strInstructions: "Chill both ingredients!! Mix in a tumbler and enjoy!", strIngredients: ["Apple cider"] },
// {
//   idDrink: "13683",
//   strAlcoholic: "Alcoholic",
//   strDrink: "Apple Slammer",
//   strInstructions:
//     "pour into a shot glass and present to consumer, they are expected to cover the top of the shotglass with thier palm, raise the glass, slam it on the bar and the swallow quickly.",
//   strIngredients: ["Apple schnapps"],
// },
// {
//   idDrink: "178327",
//   strAlcoholic: "Alcoholic",
//   strDrink: "Pineapple Paloma",
//   strInstructions:
//     "Rub the rim of each glass with lime slice and dip into salt.\r\nAdd ice, tequila, grapefruit juice, lime juice and top with pineapple soda.\r\nGive it a quick stir.\r\nGarnish with fresh pineapple or lime.",
//   strIngredients: ["Grapefruit Juice", "Fresh Lime Juice", "Pineapple Juice", "Lime", "Pepper"],
// },
// { idDrink: "12710", strAlcoholic: "Non alcoholic", strDrink: "Apple Berry Smoothie", strInstructions: "Throw everything into a blender and liquify.", strIngredients: ["Apple"] },
// {
//   idDrink: "12864",
//   strAlcoholic: "Optional alcohol",
//   strDrink: "Apple Cider Punch #1",
//   strInstructions: "If you use the whole all spice and cloves, tie them in cheesecloth. Heat the mixture. Stir occasionally. If you want an alcoholic drink, rum would be nice.",
//   strIngredients: ["Brown sugar", "Lemonade", "Orange juice", "Cloves", "Allspice", "Nutmeg", "Cinnamon"],
// },
// {
//   idDrink: "16958",
//   strAlcoholic: "Alcoholic",
//   strDrink: "Apple Pie with A Crust",
//   strInstructions: "Just mix the two liquids and sprinkle in the cinnamon. Serve either cold or heated.",
//   strIngredients: ["Malibu rum", "Cinnamon"],
// },
// {
//   idDrink: "11391",
//   strAlcoholic: "Alcoholic",
//   strDrink: "Frozen Pineapple Daiquiri",
//   strInstructions: "Combine all ingredients with 1 cup of crushed ice in an electric blender. Blend at a low speed for a short length of time. Pour into a cocktail glass and serve.",
//   strIngredients: ["Pineapple", "Lime juice", "Sugar"],
// },
// { idDrink: "12718", strAlcoholic: "Non alcoholic", strDrink: "Pineapple Gingerale Smoothie", strInstructions: "Throw everything into a blender and liquify.", strIngredients: ["Pineapple"] },
// {
//   idDrink: "12712",
//   strAlcoholic: "Non alcoholic",
//   strDrink: "Grape lemon pineapple Smoothie",
//   strInstructions: "Throw everything into a blender and liquify.",
//   strIngredients: ["Lemon", "Pineapple"],
// })
