import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@material-ui/core";
import { OriginalDataProps, DataProps, FiltersProps } from "../types";

type Props = {
  setdata: React.Dispatch<React.SetStateAction<DataProps[] | null | undefined>>;
  setfilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
};

function Form({ setdata, setfilters }: Props) {
  const [name, setname] = useState("");

  async function handleFormSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setfilters({ isAlcoholic: true, isNonAlcoholic: true });

    const searchName = name.trim();
    setname(searchName);
    if (searchName === "") return setdata([]);

    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchName}`);
    if (response.data.drinks === null) return setdata([]);

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
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <TextField id="outlined-password-input" label="Name" type="text" autoComplete="current-password" variant="outlined" value={name} onChange={(e) => setname(e.target.value)} />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>
    </form>
  );
}

export default Form;
