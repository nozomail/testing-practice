import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";
import axios from "axios";

describe("Form", () => {
  const setdata = jest.fn();
  const setfilters = jest.fn();
  test("renders all input fields and a search button", () => {
    render(<Form setdata={setdata} setfilters={setfilters} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  test("renders an input field and a submit button", () => {
    render(<Form setdata={setdata} setfilters={setfilters} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  test("types inside an input field and updates the field", () => {
    render(<Form setdata={setdata} setfilters={setfilters} />);

    userEvent.type(screen.getByLabelText("Name"), "apple");

    expect(screen.getByLabelText("Name")).toHaveValue("apple");
  });

  test("does not call API and deletes result when searched with ' '", async () => {
    const response = {
      data: {
        drinks: null,
      },
    };
    jest.mock("axios");
    axios.get = jest.fn().mockResolvedValue(response);
    render(<Form setdata={setdata} setfilters={setfilters} />);

    userEvent.type(screen.getByLabelText("Name"), " ");
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(axios.get).not.toHaveBeenCalled();
    expect(setdata).toBeCalledWith([]);
  });

  test("calls API and deletes result when searched with invalid keyword", async () => {
    const response = {
      data: {
        drinks: null,
      },
    };
    jest.mock("axios");
    axios.get = jest.fn().mockResolvedValue(response);
    render(<Form setdata={setdata} setfilters={setfilters} />);

    userEvent.type(screen.getByLabelText("Name"), "aaa");
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(setdata).toBeCalledWith([]);
  });

  test("calls API and updates result with response when searched with 'cherry", async () => {
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
    const newData = [
      {
        idDrink: "11239",
        strAlcoholic: "Alcoholic",
        strDrink: "Cherry Rum",
        strInstructions: "Shake all ingredients with ice, strain into a cocktail glass, and serve.",
        strIngredients: ["Cherry brandy", "Light cream"],
      },
      {
        idDrink: "13072",
        strAlcoholic: "Alcoholic",
        strDrink: "Popped cherry",
        strInstructions: "Served over ice in a tall glass with a popped cherry (can add more popped cherries if in the mood)!",
        strIngredients: ["Cherry liqueur", "Cranberry juice", "Orange juice"],
      },
      {
        idDrink: "17174",
        strAlcoholic: "Alcoholic",
        strDrink: "Cherry Electric Lemonade",
        strInstructions: "Now stir vigorously and then pour over a large cup of ice. Now drink it with a straw and stir occasionally.",
        strIngredients: ["Tequila", "Vodka", "White rum", "Triple Sec", "Cherry Grenadine", "Sweet and sour", "Club soda"],
      },
    ];
    jest.mock("axios");
    axios.get = jest.fn().mockResolvedValue(response);
    render(<Form setdata={setdata} setfilters={setfilters} />);

    userEvent.type(screen.getByLabelText("Name"), "cherry");
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(setdata).toBeCalledWith(newData);
  });
});
