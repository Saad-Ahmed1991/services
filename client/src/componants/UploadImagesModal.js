import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdOutlineUpload } from "react-icons/md";
import CustomSelect from "./CustomSelect";
import { MdUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { uploadImages } from "../redux/Actions/serviceActions";
import LoadingSpinner from "./LoadingSpinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: 700,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function UploadImagesModal({ albums }) {
  const loading = useSelector((state) => state.serviceReducer.loading);
  const [open, setOpen] = React.useState(false);
  const [updateAlbum, setUpdateAlbum] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [subfolderName, setSubfolderName] = React.useState("");
  const [error, setError] = React.useState(false);
  const userId = useSelector((state) => state.userReducer.currentUser._id);
  const dispatch = useDispatch();

  //upload multiple

  const handleImagesUpload = async (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        if (newImages.length === files.length) {
          setImages([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadImages = () => {
    if (subfolderName === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    } else {
      dispatch(uploadImages(images, subfolderName, userId, setOpen));
      setSubfolderName("");
      setError(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImages([]);
    setSubfolderName("");
  };

  return (
    <>
      {loading ? (
        <div className="flex gap-3 items-center justify-center w-full h-full">
          <p className="text-xl tracking-wider font-semibold">Uploading...</p>
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <div
            className="cursor-pointer mr-auto flex text-white bg-gray-700 rounded-lg px-1 items-center gap"
            onClick={handleOpen}
          >
            <p>Upload a new album</p>
            <MdUpload />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              className="bg-gray-400 rounded-xl bg-opacity-80"
              sx={{ ...style }}
            >
              <div className="w-full bg-gray-400 bg-opacity-100 border-2 p-4 overflow-y-auto h-full text-xl font-normal flex flex-col items-center justify-start md:max-w-[700px] md:w-[80%] md:m-auto">
                <div className="w-full text-center">
                  <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white">
                    Upload a new photo album
                  </h1>
                </div>
                <div className="flex w-full h-full font-semibold justify-evenly flex-col gap-6">
                  <div className="flex flex-col gap-10">
                    <div className=" relative flex flex-col">
                      <label>Album Name:</label>
                      <input
                        value={subfolderName}
                        onChange={(e) => setSubfolderName(e.target.value)}
                        type="text"
                        className="border-2 rounded"
                        required
                      />
                      {error ? (
                        <span className="absolute -bottom-5 left-0 text-sm text-red-400">
                          *This field is required*
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-3 ">
                      <label htmlFor="files_input">Select your pictures</label>
                      <input
                        onChange={handleImagesUpload}
                        className=""
                        id="files_input"
                        type="file"
                        multiple
                      />
                    </div>
                  </div>
                  {/* if the user wants to update an exisiting album */}
                  <div
                    onClick={() => setUpdateAlbum(!updateAlbum)}
                    className="w-full"
                  >
                    <p className="text-blue-600 w-full underline cursor-pointer tracking-wider underline-offset-4">
                      Select an existing album?
                    </p>
                  </div>
                  {updateAlbum ? (
                    <div className="w-full">
                      <div className="flex gap-3 flex-col">
                        <label>Select an album:</label>
                        <CustomSelect
                          albums={albums}
                          setSubfolderName={setSubfolderName}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="w-full flex justify-center">
                    <button
                      onClick={handleUploadImages}
                      className={
                        subfolderName === "" || images.length === 0
                          ? "flex w-80 bg-gray-300 pointer-events-none items-center text-white tracking-wider text-xl font-medium gap-3 border-2 border-black/50 rounded-xl px-4 py-2 justify-center"
                          : "flex w-80 bg-blue-gray-600 items-center text-white tracking-wider text-xl font-medium gap-3 border-2 rounded-xl px-4 py-2 justify-center"
                      }
                    >
                      <p>Upload now</p>
                      <MdOutlineUpload size={30} />
                    </button>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
