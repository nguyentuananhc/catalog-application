import { useState, useEffect, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

function useFetchData() {
  const [listProduct, setList] = useState([]);
  const [storedListProduct, setStoredListProduct] = useLocalStorage("list", "");

  const fetchData = useCallback(() => {
    fetch("https://run.mocky.io/v3/7af6f34b-b206-4bed-b447-559fda148ca5")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setStoredListProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setStoredListProduct]);

  useEffect(() => {
    if (!storedListProduct) {
      fetchData();
    } else {
      setList(storedListProduct);
    }
  }, [fetchData, storedListProduct]);

  return listProduct;
}

export default useFetchData;
