import React from "react";
import { FiltersProps } from "../types";

type Props = {
  filters: FiltersProps;
  setfilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
};

function Filter({ filters, setfilters }: Props) {
  function handleChange(type: "alcoholic" | "nonAlcoholic") {
    switch (type) {
      case "alcoholic":
        return setfilters({
          ...filters,
          isAlcoholic: !filters.isAlcoholic,
        });

      case "nonAlcoholic":
        return setfilters({
          ...filters,
          isNonAlcoholic: !filters.isNonAlcoholic,
        });
      default:
        return;
    }
  }

  return (
    <div className="Filter">
      <input id="alcoholic" type="checkbox" checked={filters.isAlcoholic} onChange={() => handleChange("alcoholic")} />
      <label htmlFor="alcoholic">Alcoholic</label>

      <input id="nonAlcoholic" type="checkbox" checked={filters.isNonAlcoholic} onChange={() => handleChange("nonAlcoholic")} />
      <label htmlFor="nonAlcoholic">Non Alcoholic</label>
    </div>
  );
}

export default Filter;
