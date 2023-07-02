import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBillboard } from "../redux/Actions/billboardActions";
import LoadingSpinner from "../componants/LoadingSpinner";

const BillBoard = () => {
  const currentBillboard = useSelector(
    (state) => state.billboardReducer.currentBillboard
  );
  console.log("current", currentBillboard);
  const loading = useSelector((state) => state.billboardReducer.loading);
  const [imageSrc, setImageSrc] = useState(null);
  const [discription, setDiscription] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    `url(https://picsum.photos/800/500?grayscale)`
  );
  const dispatch = useDispatch();
  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setBackgroundImage(`url(${reader.result})`);
    };
  };
  useEffect(() => {
    dispatch(getBillboard());
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {currentBillboard?.length === 0 || currentBillboard === undefined ? (
            <div className="flex flex-col items-center justify-center w-full gap-5">
              <label>Create a new Billboard</label>
              <input type="text" />
              <button className="border-2">Create now!</button>
            </div>
          ) : (
            <>
              <div>
                <h1 className="w-full font-bold text-lg tracking-widest text-center mb-4">
                  Update Billboard image
                </h1>
                <div className="max-w-[1400px] h-[500px] w-full m-auto px-4">
                  <div className="relative w-full h-full">
                    <div
                      style={{
                        backgroundImage: backgroundImage,
                      }}
                      className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                    ></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <p>{discription}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex h-full pb-20 flex-col justify-center w-full lg:justify-evenly lg:pt-5 items-center lg:flex-row gap-10">
                    <div className="flex flex-col justify-center items-center gap-3 ">
                      <label htmlFor="files_input">Select your pictures</label>
                      <input
                        onChange={(e) => previewImage(e.target.files[0])}
                        className=""
                        id="files_input"
                        type="file"
                      />
                    </div>
                    <div className=" relative justify-center items-center flex flex-grow flex-col">
                      <label>{"Discription (Optional):"}</label>
                      <textarea
                        onChange={(e) => setDiscription(e.target.value)}
                        className="border-2 rounded"
                      />
                    </div>
                    <div className="w-36 cursor-pointer border-2 rounded-xl bg-blue-gray-500 py-2 px-32 flex justify-center items-center">
                      Upload
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default BillBoard;
