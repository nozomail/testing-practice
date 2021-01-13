import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
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
      <FormControlLabel control={<Checkbox checked={filters.isAlcoholic} onChange={() => handleChange("alcoholic")} name="alcoholic" />} label="Alcoholic" />
      <FormControlLabel control={<Checkbox checked={filters.isNonAlcoholic} onChange={() => handleChange("nonAlcoholic")} name="nonAlcoholic" />} label="Non Alcoholic" />
    </div>
  );
}

export default Filter;
