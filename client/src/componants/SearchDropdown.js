import { Rating } from "@mui/material";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { cities, professions } from "../consts/consts";
import { useDispatch } from "react-redux";
import { searchValues } from "../redux/Actions/serviceActions";

const SearchDropdown = ({ setSearch }) => {
  const [rating, setRating] = useState(0);
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(searchValues(profession, city, rating));
    setSearch(false);
  };

  return (
    <div className="relative flex gap-6 items-center text-white flex-col py-5">
      <button onClick={() => setSearch(false)} className="absolute right-10">
        <IoIosCloseCircleOutline size={30} />
      </button>
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-widest text-xs font-bold mb-2">
          Profession
        </label>
        <div className="relative">
          <select
            onChange={(e) => setProfession(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Choose a profession</option>
            {professions.map((profession) => (
              <option key={profession}>{profession}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-widest text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          City
        </label>
        <div className="relative">
          <select
            onChange={(e) => setCity(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Choose a city</option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase justify-self-start w-full tracking-widest text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Rating
        </label>
        <Rating
          onChange={(e) => setRating(e.target.value)}
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
      <Link to="/search">
        <button
          onClick={() => handleSearch()}
          className="px-32 py-2 rounded-xl tracking-widest text-2xl border"
        >
          Seach
        </button>
      </Link>
    </div>
  );
};

export default SearchDropdown;
