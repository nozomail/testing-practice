import React, { useState } from "react";
import axios from "axios";
import { OriginalDataProps, DataProps, FiltersProps } from "./types";

type Props = {
  setdata: React.Dispatch<React.SetStateAction<DataProps[] | null | undefined>>;
  setfilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
};

function Form({ setdata, setfilters }: Props) {
  const [name, setname] = useState("");

  async function handleFormSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    if (response.data.drinks) {
      const modifiedData: DataProps[] = response.data.drinks.map((drink: OriginalDataProps) => {
        const ingredients = [];
        for (let i = 1; i < 16; i++) {
          const ingredient = drink[`strIngredient${i + 1}`];
          if (ingredient === null || ingredient === "") break;
          ingredients.push(ingredient);
        }

        return {
          idDrink: drink.idDrink,
          strAlcoholic: drink.strAlcoholic,
          strDrink: drink.strDrink,
          strInstructions: drink.strInstructions,
          strIngredients: ingredients,
        };
      });
      setdata(modifiedData);
      setfilters({ isAlcoholic: true, isNonAlcoholic: true });
    }
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={name} onChange={(e) => setname(e.target.value)} />
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

export default Form;
