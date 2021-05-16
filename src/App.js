/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Pagination } from "@material-ui/lab";

import Header from "components/Header";
import Product from "components/Product";
import useFetchData from "hooks/useFetchData";
import usePagination from "hooks/usePagination";
import useDebounce from "hooks/useDebounce";
import "./App.css";

const PER_PAGE = 9;

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [total, showTotal] = useState(false);
  const debouncedSearchTerm = useDebounce(query, 2000);
  const [listProduct, setListProduct] = useState([]);
  const fetchData = useFetchData();

  const inputRef = useRef(null);
  const count = Math.ceil(listProduct.length / PER_PAGE);
  const _DATA = usePagination(listProduct, PER_PAGE);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search); //
  //   let urlQuery = params.get("query");
  //   if (urlQuery) {
  //     setQuery(urlQuery);
  //     // handleQuery(urlQuery);
  //   }
  // }, []);

  useEffect(() => {
    if (fetchData.length) setListProduct(fetchData);
  }, [fetchData]);

  const handlePaginationChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const countPriority = (key = [], res = []) => {
    let priority1 = 0; // order condition
    let priority2 = 0; // key position condition

    if (key.length === res.length) {
      priority1 = key.length * 100;
      if (res[0][0] === key[0]) {
        //in order;
        res.forEach((item, index) => {
          if (key[index] === item[0]) {
            priority1 += 10;
            priority2 -= item.index / 10;
          }
        });
      }
    } else {
      priority1 = res.length * 100;
    }

    return priority1 + priority2;
  };

  // const setURLQuery = (q) => {
  //   let url = new URL(window.location.href);
  //   let params = new URLSearchParams(url.search);
  //   params.set("query", q);
  //   document.location.search = params;
  // };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleQuery(query);
      showTotal(true);
    }
  };

  const handleQuery = (q) => {
    const keywords = q.trim().split(" ");

    let re = new RegExp(keywords.join("|"), "gi");

    let hits = fetchData
      .filter((product) => {
        const res = [...product.name.matchAll(re)];
        return !!res.length;
      })
      .map((item) => {
        const res = [...item.name.matchAll(re)];
        let boldName = item.name;
        res.forEach((item) => {
          boldName = boldName.replace(item, `<b>${item}</b>`);
        });
        const priority = countPriority(keywords, res);
        return { ...item, name: boldName, priority };
      });

    let sortedProduct = hits.sort((a, b) =>
      Number(b.priority) > Number(a.priority) ? 1 : -1
    );

    setListProduct(sortedProduct);
  };
  useEffect(() => {
    if (!query) {
      setListProduct(fetchData);
      showTotal(false);
    }
  }, [query]);

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     handleQuery();
  //   }

  // }, [debouncedSearchTerm]);

  return (
    <React.Fragment>
      <Header />
      <div className="min-h-screen bg-gray-300">
        <div className="container flex flex-col max-w-screen-xl px-10 pt-10 mx-auto">
          <div className="flex mb-5">
            <input
              ref={inputRef}
              value={query}
              type="text"
              onChange={handleInputChange}
              className="w-full px-4 py-3 font-medium text-gray-600 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
              placeholder="Search Product"
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button
                onClick={() => {
                  // setURLQuery(query);
                  handleQuery(query);
                  showTotal(true);
                }}
                className="px-4 py-2 ml-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Search
              </button>
            )}
          </div>
          {total && (
            <div>
              {`${listProduct.length} Kết quả tìm kiếm cho từ khoá "${query}"`}
            </div>
          )}
        </div>
        <div className="container max-w-screen-xl px-10 mx-auto">
          {!listProduct.length ? (
            <div className="flex items-center justify-center h-50v">
              <div className="w-64 h-64 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader" />
            </div>
          ) : (
            <React.Fragment>
              <div className="grid grid-cols-2 gap-2 p-8 mt-4 bg-white rounded shadow md:grid-cols-3 md:gap-4 auto-rows-max md:auto-rows-min">
                {_DATA.currentData().map((item, index) => (
                  <Product
                    key={index}
                    productInfo={{ ...item, query: debouncedSearchTerm }}
                  />
                ))}
              </div>
              <div className="p-10 mx-auto w-100">
                <div className="flex items-center justify-center mb-5">
                  <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePaginationChange}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
