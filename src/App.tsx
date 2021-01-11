import React, { useState, useEffect } from "react";
import Form from "./Form";
import ListItem from "./ListItem";
import Filter from "./Filter";
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
    <div className="App">
      <Form setdata={setdata} setfilters={setfilters} />
      {data !== undefined && (
        <div>
          <Filter filters={filters} setfilters={setfilters} />
          {drinkList.length > 0 ? (
            <ul>
              {drinkList.map((item) => (
                <ListItem key={item.idDrink} {...item} />
              ))}
            </ul>
          ) : (
            <p>No data found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
