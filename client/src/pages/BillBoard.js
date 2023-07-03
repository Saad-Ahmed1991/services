import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImagesToBillboard,
  createBillboard,
  getBillboard,
  selectHomeBillboard,
} from "../redux/Actions/billboardActions";
import LoadingSpinner from "../componants/LoadingSpinner";
import Select from "react-select";
import { AiFillCamera, AiFillCheckSquare } from "react-icons/ai";

const BillBoard = () => {
  const billboards = useSelector((state) => state.billboardReducer.billboards);
  const loading = useSelector((state) => state.billboardReducer.loading);
  const uploadLoading = useSelector(
    (state) => state.billboardReducer.uploadLoading
  );
  const [billboardName, setBillboardName] = useState("");
  const [selectedHomeBillboardId, setSelectedHomeBillboardId] = useState("");
  const [billboardToUpdate, setBillboardToUpdate] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
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
  const options = billboards.map((billboard) => ({
    value: billboard.name,
    billboardId: billboard._id,
    label: (
      <div className="flex items-center">
        <img
          src={billboard.billboard[0] || ""}
          alt={billboard.billboard[0] || ""}
          className="w-10 h-10 mr-2"
        />
        <p className="text-lg">{billboard.name}</p>
      </div>
    ),
  }));

  const handleChange = (selectedOption) => {
    setBillboardName(selectedOption.value);
    setBillboardToUpdate(selectedOption.billboardId);
  };
  const handleSelect = (selectedOption) => {
    setSelectedHomeBillboardId(selectedOption.billboardId);
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
          <div className="flex flex-col items-center justify-center w-full gap-5 lg:flex-row lg:justify-between px-10">
            <div className="flex flex-col">
              <div>
                <label
                  htmlFor="BillBoard_Name"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Create a new Billboard:
                </label>
                <input
                  onChange={(e) => setBillboardName(e.target.value)}
                  type="text"
                  id="BillBoard_Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Billboard Name"
                />
              </div>
              <button
                onClick={() => dispatch(createBillboard(billboardName))}
                className="border-2"
              >
                Create now!
              </button>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="billboardSelect"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Select a billboard to update:
              </label>
              <Select
                id="billboardSelect"
                className="border-2 border-black w-72"
                options={options}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="BillBoard_Name"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Select Homepage Billboard:
              </label>
              <div className="flex items-center gap-4">
                <Select
                  className="border-2 border-black w-72"
                  options={options}
                  onChange={handleSelect}
                />
                <button
                  onClick={() =>
                    dispatch(selectHomeBillboard(selectedHomeBillboardId))
                  }
                  className={
                    !selectedHomeBillboardId
                      ? "text-gray-400"
                      : "text-light-green-600"
                  }
                  disabled={!selectedHomeBillboardId ? true : false}
                >
                  <div className="flex items-center 2 px-4 border-2 rounded">
                    <p>Select</p>
                    <AiFillCheckSquare size={40} />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="w-full font-bold text-lg tracking-widest text-center mb-4">
              Update Billboard image
            </h1>
            <div className="relative group max-w-[1400px] h-[500px] w-full m-auto px-4">
              <div className="relative w-full h-full">
                <div
                  style={{
                    backgroundImage: backgroundImage,
                  }}
                  className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                ></div>
              </div>
              <>
                <input
                  onChange={(e) => previewImage(e.target.files[0])}
                  className="hidden"
                  id="billboardPictures"
                  type="file"
                />
                <label htmlFor="billboardPictures">
                  <div className="hidden group-hover:flex bg-black/50 text-white font-semibold text-lg tracking-wider cursor-pointer absolute top-0 left-0 w-full h-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <p>Picture</p>
                      <AiFillCamera size={30} />
                    </div>
                  </div>
                </label>
              </>
            </div>
            <div>
              <div className="flex h-full pb-20 flex-col justify-center w-full lg:justify-evenly lg:pt-5 items-center lg:flex-row gap-10">
                <>
                  <input className="hidden" id="profilePicture" type="file" />
                  <label htmlFor="profilePicture">
                    <div className="hidden group-hover:flex bg-black/50 text-white font-semibold text-lg tracking-wider cursor-pointer absolute top-0 left-0 w-full h-full rounded-full  items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <p>Picture</p>
                        <AiFillCamera size={30} />
                      </div>
                    </div>
                  </label>
                </>
                <div>
                  {uploadLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <div
                      onClick={() =>
                        dispatch(
                          addImagesToBillboard(billboardToUpdate, imageSrc)
                        )
                      }
                      className="w-36 cursor-pointer border-2 rounded-xl bg-blue-gray-500 py-2 px-32 flex justify-center items-center"
                    >
                      Upload
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BillBoard;
