import * as React from "react";
import Modal from "@mui/material/Modal";
import FollowCard from "./FollowCard";
import { Link } from "react-router-dom";
import { CiFaceMeh } from "react-icons/fa";

export default function FollowersModal({ title, number, list }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="rounded-xl font-semibold hover:scale-110 w-[130px] flex items-center flex-col hover:bg-gray-300">
      <div
        onClick={handleOpen}
        className="cursor-pointer flex flex-col items-center justify-center"
      >
        <p>{title}</p>
        <p>{number}</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute w-full px-2 pt-16 flex flex-col items-start justify-start gap-2 lg:flex-row lg:flex-wrap overflow-y-scroll top-[50%] left-[50%] sm:w-[85%] md:w-[75%] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] h-[40rem] bg-gray-50 bg-opacity-90">
          {list.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <p>This profile has no {title}...</p>
            </div>
          ) : (
            list?.map((el, i) => (
              <Link
                className="mx-auto"
                key={el._id}
                to={`/profile/${el.user._id}`}
              >
                <FollowCard
                  firstName={el.user.firstName}
                  lastName={el.user.lastName}
                  img={el.profile.profileImg}
                  handleClose={handleClose}
                />
              </Link>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
