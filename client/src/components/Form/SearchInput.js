import React from "react";
import { useSearch } from "../../Context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If keyword is empty, don't call API
    if (!values.keyword.trim()) {
      alert("Please enter a keyword to search");
      return;
    }

    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword.trim()}`
      );

      // Backend returns { success: true, results: [...] }
      if (data?.success) {
        setValues({ ...values, results: data.results });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
      alert("Error while searching products");
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword || ""}
          onChange={(e) =>
            setValues({ ...values, keyword: e.target.value })
          }
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;