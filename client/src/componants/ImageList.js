import React from "react";
import { useSelector } from "react-redux";

const ImageList = () => {
  const images = useSelector(
    (state) => state.serviceReducer.userService.images
  );
  return (
    <div className="grid shadow-gray-500 shadow-2xl grid-cols-2 md:grid-cols-4 gap-4">
      {images?.map((image, i) => (
        <div key={i}>
          <img
            src={image}
            className="hover:scale-105 cursor-pointer h-auto max-w-full rounded-lg"
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
