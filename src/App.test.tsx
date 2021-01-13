import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import axios from "axios";

describe("App", () => {
  jest.mock("axios");

  test("renders default content", () => {
    render(<App />);

    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "Alcoholic" })).not.toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "Non Alcoholic" })).not.toBeInTheDocument();
    expect(screen.queryByText("No data found.")).not.toBeInTheDocument();
  });

  test("when searched with invalid keywords", async () => {
    const response = {
      data: {
        drinks: null,
      },
    };
    axios.get = jest.fn().mockResolvedValue(response);

    render(<App />);

    userEvent.type(screen.getByRole("textbox", { name: "Name" }), "aaa");
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => screen.getByRole("checkbox", { name: "Alcoholic" }));
    expect(screen.getByText("No data found.")).toBeInTheDocument();
  });

  test("when searched with valid keywords", async () => {
    const response = {
      data: {
        drinks: [
          {
            idDrink: "11239",
            strDrink: "Cherry Rum",
            strDrinkAlternate: null,
            strDrinkES: null,
            strDrinkDE: null,
            strDrinkFR: null,
            "strDrinkZH-HANS": null,
            "strDrinkZH-HANT": null,
            strTags: null,
            strVideo: null,
            strCategory: "Ordinary Drink",
            strIBA: null,
            strAlcoholic: "Alcoholic",
            strGlass: "Cocktail glass",
            strInstructions: "Shake all ingredients with ice, strain into a cocktail glass, and serve.",
            strInstructionsES: null,
            strInstructionsDE: "Alle Zutaten mit Eis sch\u00fctteln, in ein Cocktailglas abseihen und servieren.",
            strInstructionsFR: null,
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/twsuvr1441554424.jpg",
            strIngredient1: "Light rum",
            strIngredient2: "Cherry brandy",
            strIngredient3: "Light cream",
            strIngredient4: null,
            strIngredient5: null,
            strIngredient6: null,
            strIngredient7: null,
            strIngredient8: null,
            strIngredient9: null,
            strIngredient10: null,
            strIngredient11: null,
            strIngredient12: null,
            strIngredient13: null,
            strIngredient14: null,
            strIngredient15: null,
            strMeasure1: "1 1/4 oz ",
            strMeasure2: "1 1/2 tsp ",
            strMeasure3: "1 tblsp ",
            strMeasure4: null,
            strMeasure5: null,
            strMeasure6: null,
            strMeasure7: null,
            strMeasure8: null,
            strMeasure9: null,
            strMeasure10: null,
            strMeasure11: null,
            strMeasure12: null,
            strMeasure13: null,
            strMeasure14: null,
            strMeasure15: null,
            strImageSource: null,
            strImageAttribution: null,
            strCreativeCommonsConfirmed: "No",
            dateModified: "2015-09-06 16:47:04",
          },
          {
            idDrink: "13072",
            strDrink: "Popped cherry",
            strDrinkAlternate: null,
            strDrinkES: null,
            strDrinkDE: null,
            strDrinkFR: null,
            "strDrinkZH-HANS": null,
            "strDrinkZH-HANT": null,
            strTags: null,
            strVideo: null,
            strCategory: "Ordinary Drink",
            strIBA: null,
            strAlcoholic: "Alcoholic",
            strGlass: "Highball glass",
            strInstructions: "Served over ice in a tall glass with a popped cherry (can add more popped cherries if in the mood)!",
            strInstructionsES: null,
            strInstructionsDE: "Serviert \u00fcber Eis in einem hohen Glas mit einer entsteinten Kirsche (kann mehr entsteinte Kirschen hinzuf\u00fcgen, wenn sie in der Stimmung sind)!",
            strInstructionsFR: null,
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/sxvrwv1473344825.jpg",
            strIngredient1: "Vodka",
            strIngredient2: "Cherry liqueur",
            strIngredient3: "Cranberry juice",
            strIngredient4: "Orange juice",
            strIngredient5: null,
            strIngredient6: null,
            strIngredient7: null,
            strIngredient8: null,
            strIngredient9: null,
            strIngredient10: null,
            strIngredient11: null,
            strIngredient12: null,
            strIngredient13: null,
            strIngredient14: null,
            strIngredient15: null,
            strMeasure1: "2 oz ",
            strMeasure2: "2 oz ",
            strMeasure3: "4 oz ",
            strMeasure4: "4 oz ",
            strMeasure5: null,
            strMeasure6: null,
            strMeasure7: null,
            strMeasure8: null,
            strMeasure9: null,
            strMeasure10: null,
            strMeasure11: null,
            strMeasure12: null,
            strMeasure13: null,
            strMeasure14: null,
            strMeasure15: null,
            strImageSource: null,
            strImageAttribution: null,
            strCreativeCommonsConfirmed: "No",
            dateModified: "2016-09-08 15:27:05",
          },
          {
            idDrink: "17174",
            strDrink: "Cherry Electric Lemonade",
            strDrinkAlternate: null,
            strDrinkES: null,
            strDrinkDE: null,
            strDrinkFR: null,
            "strDrinkZH-HANS": null,
            "strDrinkZH-HANT": null,
            strTags: null,
            strVideo: null,
            strCategory: "Cocktail",
            strIBA: null,
            strAlcoholic: "Alcoholic",
            strGlass: "Pint glass",
            strInstructions: "Now stir vigorously and then pour over a large cup of ice. Now drink it with a straw and stir occasionally.",
            strInstructionsES: null,
            strInstructionsDE: "Nun kr\u00e4ftig umr\u00fchren und dann \u00fcber einen gro\u00dfen Becher Eis gie\u00dfen. Nun mit einem Strohhalm trinken und gelegentlich umr\u00fchren.",
            strInstructionsFR: null,
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/tquyyt1451299548.jpg",
            strIngredient1: "Gin",
            strIngredient2: "Tequila",
            strIngredient3: "Vodka",
            strIngredient4: "White rum",
            strIngredient5: "Triple Sec",
            strIngredient6: "Cherry Grenadine",
            strIngredient7: "Sweet and sour",
            strIngredient8: "Club soda",
            strIngredient9: null,
            strIngredient10: null,
            strIngredient11: null,
            strIngredient12: null,
            strIngredient13: null,
            strIngredient14: null,
            strIngredient15: null,
            strMeasure1: "1 oz",
            strMeasure2: "1 oz",
            strMeasure3: "1 oz",
            strMeasure4: "1 oz",
            strMeasure5: "1 oz",
            strMeasure6: "1 oz",
            strMeasure7: "1 oz",
            strMeasure8: "3 oz",
            strMeasure9: null,
            strMeasure10: null,
            strMeasure11: null,
            strMeasure12: null,
            strMeasure13: null,
            strMeasure14: null,
            strMeasure15: null,
            strImageSource: null,
            strImageAttribution: null,
            strCreativeCommonsConfirmed: "Yes",
            dateModified: "2015-12-28 10:45:48",
          },
        ],
      },
    };
    axios.get = jest.fn().mockResolvedValue(response);

    render(<App />);

    userEvent.type(screen.getByRole("textbox", { name: "Name" }), "cherry");
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => screen.getByRole("checkbox", { name: "Alcoholic" }));

    expect(screen.getByText("Cherry Rum")).toBeInTheDocument();
    expect(screen.getByText("Popped cherry")).toBeInTheDocument();
    expect(screen.getByText("Cherry Electric Lemonade")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Alcoholic" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Alcoholic" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Non Alcoholic" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Non Alcoholic" })).toBeChecked();

    userEvent.click(screen.getByRole("checkbox", { name: "Alcoholic" }));

    expect(screen.getByRole("checkbox", { name: "Alcoholic" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Non Alcoholic" })).toBeChecked();
    expect(screen.getByText("No data found.")).toBeInTheDocument();
    expect(screen.queryByText("Cherry Rum")).not.toBeInTheDocument();
    expect(screen.queryByText("Popped cherry")).not.toBeInTheDocument();
    expect(screen.queryByText("Cherry Electric Lemonade")).not.toBeInTheDocument();

    userEvent.click(screen.getByRole("checkbox", { name: "Alcoholic" }));

    expect(screen.getByRole("checkbox", { name: "Alcoholic" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Non Alcoholic" })).toBeChecked();
    expect(screen.getByText("Cherry Rum")).toBeInTheDocument();
    expect(screen.getByText("Popped cherry")).toBeInTheDocument();
    expect(screen.getByText("Cherry Electric Lemonade")).toBeInTheDocument();

    userEvent.click(screen.getByRole("checkbox", { name: "Non Alcoholic" }));

    expect(screen.getByRole("checkbox", { name: "Alcoholic" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Non Alcoholic" })).not.toBeChecked();
    expect(screen.getByText("Cherry Rum")).toBeInTheDocument();
    expect(screen.getByText("Popped cherry")).toBeInTheDocument();
    expect(screen.getByText("Cherry Electric Lemonade")).toBeInTheDocument();
  });
});
