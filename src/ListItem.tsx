import React, { useState } from "react";
import { DataProps } from "./types";

function ListItem({ idDrink, strAlcoholic, strDrink, strInstructions, strIngredients }: DataProps) {
  const [isOpen, setisOpen] = useState(false);

  return (
    <li key={idDrink} onClick={() => setisOpen(!isOpen)}>
      [{strAlcoholic}] <strong>{strDrink}</strong>
      {isOpen && (
        <div>
          Ingredients:
          <ul>
            {strIngredients.map((ingredient, index) => (
              <li key={ingredient + index}>{ingredient}</li>
            ))}
          </ul>
          <p>{strInstructions}</p>
        </div>
      )}
    </li>
  );
}

export default ListItem;
