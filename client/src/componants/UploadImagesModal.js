import React from "react";
import Modal from "@mui/material/Modal";
import { MdUpload } from "react-icons/md";

const UploadImagesModal = ({ albums }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen} className="w-full flex justify-end">
        <div className="flex cursor-pointer group gap-2 items-center bg-light-blue-400 px-2 lgpx-5 py-1 rounded-lg text-white tracking-wider font-medium ">
          <span>{<MdUpload size={20} />}</span>
          <p className="group-hover:underline">Create A New Album</p>
        </div>
      </div>
      <Modal
        className="relative"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute inset-14 bg-white p-14 flex items-center justify-around">
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Default input
            </label>
            <input
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <input type="file" multiple />
        </div>
      </Modal>
    </div>
  );
};

export default UploadImagesModal;
