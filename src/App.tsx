import React, { useState, useEffect } from "react";
import { Typography, Box, List } from "@material-ui/core";
import Form from "./components/Form";
import Item from "./components/Item";
import Filter from "./components/Filter";
import { DataProps } from "./types";

function App() {
  const [filters, setfilters] = useState({
    isAlcoholic: true,
    isNonAlcoholic: true,
  });
  const [data, setdata] = useState<DataProps[] | null | undefined>(undefined);
  const [drinkList, setdrinkList] = useState<DataProps[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      if (filters.isAlcoholic && filters.isNonAlcoholic) {
        setdrinkList(data.map((item) => item));
      } else if (filters.isAlcoholic) {
        setdrinkList(data.filter((item) => item.strAlcoholic === "Alcoholic"));
      } else if (filters.isNonAlcoholic) {
        setdrinkList(data.filter((item) => item.strAlcoholic === "Non alcoholic"));
      } else {
        setdrinkList([]);
      }
    } else {
      setdrinkList([]);
    }
  }, [data, filters]);

  return (
    <Box className="App" p={2}>
      <Box mb={4}>
        <Typography variant="h4" component="h1">
          Cocktail Search
        </Typography>
      </Box>
      <Form setdata={setdata} setfilters={setfilters} />
      {data !== undefined && (
        <Box mt={4}>
          <Filter filters={filters} setfilters={setfilters} />
          {drinkList.length > 0 ? (
            <List>
              {drinkList.map((item) => (
                <Item key={item.idDrink} {...item} />
              ))}
            </List>
          ) : (
            <p>No data found.</p>
          )}
        </Box>
      )}
    </Box>
  );
}

export default App;
