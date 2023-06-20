import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdOutlineUpload } from "react-icons/md";
import CustomSelect from "./CustomSelect";
import { MdUpload } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function UploadImagesModal({ albums }) {
  const [open, setOpen] = React.useState(false);
  const [albumName, setAlbumName] = React.useState("");
  const [updateAlbum, setUpdateAlbum] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className="cursor-pointer mr-auto flex text-white bg-gray-700 rounded-lg px-1 items-center gap md:hidden"
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
        <Box sx={{ ...style, backgroundColor: "white" }}>
          <div className="w-full h-full text-xl font-normal flex flex-col max-w-[1240px] items-center justify-start md:w-[60%] md:m-auto">
            <div className="w-full text-center">
              <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white">
                Upload a new photo album
              </h1>
            </div>

            <div className="flex w-full h-full justify-evenly flex-col gap-6">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col">
                  <label>Album Name:</label>
                  <input
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    type="text"
                    className="border-2 rounded"
                  />
                </div>
                <div className="flex flex-col gap-3 ">
                  <label htmlFor="files_input">Select your pictures</label>
                  <input className="" id="files_input" type="file" multiple />
                </div>
              </div>
              {/* if the user wants to update an exisiting album */}
              <div
                onClick={() => setUpdateAlbum(!updateAlbum)}
                className="w-full"
              >
                <p className="text-blue-600 w-full underline cursor-pointer tracking-wider underline-offset-4">
                  Update an existing album?
                </p>
              </div>
              {updateAlbum ? (
                <div className="w-full">
                  <div className="flex gap-3 flex-col">
                    <label>Select an album:</label>
                    <CustomSelect albums={albums} setAlbumName={setAlbumName} />
                  </div>
                </div>
              ) : null}
              <button
                className={
                  "flex bg-gray-600 items-center text-white tracking-wider text-xl font-medium gap-3 border-2 rounded-xl px-4 py-2 justify-center"
                }
              >
                <p>Upload now</p>
                <MdOutlineUpload size={30} />
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
