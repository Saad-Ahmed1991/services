import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UploadImagesModal from "./UploadImagesModal";

const ImageList = () => {
  const images = useSelector(
    (state) => state.serviceReducer.userService.images
  );
  const albums = useSelector((state) => state.serviceReducer.albums.albums);

  return (
    <>
      {albums?.length === 0 ? (
        <div className="w-full h-full p-20 border-4">
          <div className=" flex flex-col gap-2 items-center justify-center">
            <label
              className="text-xl tracking-wider font-semibold"
              htmlFor="multiple_select"
            >
              No Images to display
            </label>
            <UploadImagesModal albums={albums} />
          </div>
        </div>
      ) : (
        <div className="grid p-2 shadow-gray-500 shadow-2xl grid-cols-2 md:grid-cols-4 gap-4">
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
      )}
    </>
  );
};

export default ImageList;
