import React from "react";
import avatar from "../assets/avatar.png";

const FollowCard = ({ firstName, lastName, img, handleClose }) => {
  return (
    <div
      onClick={handleClose}
      className="border-2 shadow-gray-700 shadow-lg m-auto py-1 w-[400px] flex h-[100px] md:w-[400px] lg:w-[350px]  justify-around items-center px-2 border-gray-600 rounded-2xl hover:scale-[101%]"
    >
      <div className="flex items-center gap-3">
        <img className=" w-20 h-20 rounded-full" src={img || avatar} alt="" />
        <div className="">
          <p className="font-medium no-underline">
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <div className="">
        <button
          className=" inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300"
          type="button"
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default FollowCard;
