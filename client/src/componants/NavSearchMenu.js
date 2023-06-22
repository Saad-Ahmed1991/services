import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { cities, professions } from "../consts/consts";
import { useDispatch } from "react-redux";
import { getAllService, searchValues } from "../redux/Actions/serviceActions";
import { Link } from "react-router-dom";

const SearcNavSearchMenu = ({ setSearchMenu }) => {
  const [rating, setRating] = useState(0);
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(searchValues(profession, city, rating));
  };
  const handleReset = () => {
    setRating(0);
    setCity("");
    setProfession("");
    dispatch(getAllService("", "", 0));
  };

  return (
    <div className="text-white flex flex-col gap-16 relative">
      <div>
        <label
          htmlFor="professions"
          className="text-3xl block mb-2 tracking-widest font-medium"
        >
          Profession
        </label>
        <select
          onChange={(e) => setProfession(e.target.value)}
          id="professions"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose a profession</option>
          {professions.map((profession) => (
            <option key={profession}>{profession}</option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="countries"
          className="block mb-2 tracking-widest text-3xl font-medium"
        >
          City
        </label>
        <select
          onChange={(e) => setCity(e.target.value)}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose a city</option>
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className="w-full flex flex-col text-3xl tracking-widest font-semibold items-center justify-center">
        <h2 className="text-3xl">Rating</h2>
        <Rating
          onChange={(e) => setRating(e.target.value)}
          name="simple-controlled"
          size="large"
          sx={{
            fontSize: "4rem",

            "& .MuiRating-iconFilled": {
              color: "yellow",
            },
            "& .MuiRating-iconHover": {
              color: "yellow",
            },
            "& .MuiRating-iconEmpty": {
              color: "white",
            },
          }}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-4 justify-between">
        <button
          onClick={handleSearch}
          className="w-full flex items-baseline tracking-widest justify-center border-2 px-4 py-3 rounded-2xl bg-white text-black font-semibold"
        >
          <Link to="/search">Search</Link>
        </button>
        <button
          onClick={() => handleReset()}
          className="w-full border-2 px-4 py-3 rounded-2xl tracking-widest bg-white text-black font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SearcNavSearchMenu;
