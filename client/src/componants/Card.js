import React from "react";
import z5 from "../assets/images/z5.jpg";
import { Rating } from "@mui/material";
import avatar from "../assets/avatar.png";

const Card = ({ el }) => {
  return (
    <div className=" relative w-[190px] h-[300px] rounded-xl overflow-hidden shadow-lg shadow-gray-600">
      <div className="flex items-center justify-center h-[4.55rem] w-full flex-col absolute top-[29%] left-[50%] translate-x-[-50%] text-xl font-bold text-gray-300 text-shadow-lg bg-black bg-opacity-50 rounded-sm px-4">
        <p>{el.profession}</p>
      </div>
      <img className="w-full h-[160px]" src={z5} alt="" />
      <div className="text-black flex flex-col items-center justify-around gap-1 h-[50%] pb-5 bg-gray-300">
        <div className=" text-center">
          <p>{el.user.firstName}</p>
          <p>{el.user.lastName}</p>
        </div>
        <Rating
          readOnly={true}
          value={el.totalRating}
          size="small"
          sx={{
            fontSize: "1.5rem",
          }}
        />
        <p>{el.profile?.city}</p>
      </div>
      <img
        className=" absolute top-1 left-1 w-[4.5rem] h-[4.5rem] rounded-full border-2 border-black/30"
        src={el.profile.profileImg || avatar}
        alt=""
      />
    </div>
  );
};

export default Card;
