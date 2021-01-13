import React, { useState } from "react";
import { ListItem, Box } from "@material-ui/core";
import LocalBar from "@material-ui/icons/LocalBarRounded";
import { DataProps } from "../types";

function Item({ idDrink, strAlcoholic, strDrink, strInstructions, strIngredients }: DataProps) {
  const [isOpen, setisOpen] = useState(false);

  return (
    <ListItem component="li" button key={idDrink} onClick={() => setisOpen(!isOpen)}>
      <div>
        <strong>{strDrink}</strong>
        {strAlcoholic === "Alcoholic" && <LocalBar color="secondary" style={{ fontSize: "16px", marginLeft: "0.25em" }} data-testid="alcoholic" />}
        {isOpen && (
          <Box pt={2}>
            <Box mb={1}>Ingredients:</Box>
            <ul>
              {strIngredients.map((ingredient, index) => (
                <li key={ingredient + index}>{ingredient}</li>
              ))}
            </ul>
            <p>{strInstructions}</p>
          </Box>
        )}
      </div>
    </ListItem>
  );
}

export default Item;
