import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import {
  follow,
  getFollowers,
  getFollowings,
  getUserService,
  rateService,
  unfollow,
} from "../redux/Actions/serviceActions";
import { Navbar } from "../componants/Navbar";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillCamera } from "react-icons/ai";
import { LuHeartOff } from "react-icons/lu";
import FollowersModal from "../componants/FollowersModal";
import AlbumTab from "../componants/AlbumsTab";
import { uploadProfilePicture } from "../redux/Actions/profileActions";

const Profile = () => {
  const [previewSource, setPreviewSource] = useState(null);
  const [rate, setRate] = useState(0);
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const service = useSelector((state) => state.serviceReducer.userService);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const followers = useSelector((state) => state.serviceReducer.followers);
  const followings = useSelector((state) => state.serviceReducer.followings);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      console.log(reader.result);
    };
  };
  const handleProfileImageChange = (e) => {
    if (!previewSource) return;
    uploadImage(previewSource, userid);
    setPreviewSource("");
    dispatch(getUserService(userid));
  };

  const uploadImage = async (base64image, userid) => {
    dispatch(uploadProfilePicture({ profileImg: base64image }, userid));
  };
  const handleRate = async () => {
    setOpenModal(!openModal);
    dispatch(rateService(service._id, rate, service.user._id));
    setRate(0);
    dispatch(getUserService(userid));
  };

  useEffect(() => {
    if (userid) {
      dispatch(getUserService(userid));
    }
  }, [userid, dispatch]);
  return (
    <>
      <Navbar />
      <div className="w-full h-full overflow-x-hidden">
        <div className="flex w-full flex-col items-center pt-24 ">
          <div className="w-full relative">
            {currentUser._id === userid ? null : (
              <div className="w-full flex justify-end pr-12">
                {service?.followers?.indexOf(currentUser?._id) !== -1 ? (
                  <div
                    className="flex items-center gap-1 w-30 px-3 bg-blue-gray-400  py-2 rounded-lg cursor-pointer font-semibold tracking-wider text-white"
                    onClick={() => dispatch(unfollow(userid))}
                  >
                    <p className="">Unfollow</p>
                    <LuHeartOff className="text-red-400" size={25} />
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-1 w-30 px-3 bg-blue-gray-400  py-2 rounded-lg cursor-pointer font-semibold tracking-wider text-white"
                    onClick={() => dispatch(follow(userid))}
                  >
                    <p className="">Follow</p>
                    <AiOutlineHeart className="text-white " size={25} />
                  </div>
                )}
              </div>
            )}
          </div>
          <h2 className="font-semibold"> {service?.profession}</h2>
        </div>
        <div className=" w-full flex flex-col  gap-6 items-center justify-around mt-10 sm:flex-row">
          <div className="relative group">
            <img
              className="rounded-full h-[300px] w-[300px]"
              src={previewSource || service?.profile?.profileImg || avatar}
              alt=""
            />
            {currentUser._id === userid && !previewSource ? (
              <>
                <input
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="profilePicture"
                  type="file"
                />
                <label htmlFor="profilePicture">
                  <div className="hidden group-hover:flex bg-black/50 text-white font-semibold text-lg tracking-wider cursor-pointer absolute top-0 left-0 w-full h-full rounded-full  items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <p>Change Picture</p>
                      <AiFillCamera size={30} />
                    </div>
                  </div>
                </label>
              </>
            ) : currentUser._id === userid && previewSource ? (
              <>
                <div className="flex bg-black/50 text-white font-semibold text-lg tracking-wider absolute top-0 left-0 w-full h-full rounded-full  items-center justify-center">
                  <div className="flex items-center justify-center gap-12 mt-24">
                    <p
                      onClick={() => setPreviewSource(null)}
                      className="cursor-pointer"
                    >
                      <ImCancelCircle className="text-red-300" size={50} />
                    </p>
                    <p
                      onClick={() => handleProfileImageChange(previewSource)}
                      className="cursor-pointer"
                    >
                      <FaUpload className="text-green-500" size={50} />
                    </p>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="w-[70%] sm:w-[30%]">
            <p className="text-lg tracking-widest text-center text-black font-sans font-extrabold">
              Details
            </p>
            <div className="flex w-full justify-between py-1">
              <p className="text-lg font-semibold tracking-widest text-gray-600  font-serif pt-2">
                Name:
              </p>
              <p className="text-lg font-semibold tracking-widest text-black pt-2">
                {service?.user?.firstName}
                {service?.user?.lastName}
              </p>
            </div>
            <div className="flex  justify-between py-1">
              <p className="text-lg font-semibold tracking-widest text-gray-600  font-serif pt-2">
                Phone Number:
              </p>
              <p className="text-lg tracking-widest text-black font-medium pt-2">
                {service?.profile?.phoneNumber}
              </p>
            </div>
            <div className="flex  justify-between py-1">
              <p className=" font-semibold text-lg tracking-widest text-gray-600  font-serif pt-2">
                Adresse:
              </p>
              <p className="text-lg tracking-widest text-black font-medium ml-2 pt-2">
                {service?.profile?.city}
              </p>
            </div>
            <div className="flex items-center justify-between py-1 pt-2">
              <p className=" font-semibold text-lg tracking-widest text-gray-600  font-serif">
                Rating:
              </p>
              <Rating
                readOnly={true}
                value={service?.totalRating || 0}
                size="small"
                sx={{
                  fontSize: "1.5rem",
                }}
              />
            </div>
            {userid === currentUser._id ? null : (
              <div className="flex cursor-pointer items-center justify-center hover:scale-[1.1] mt-4">
                <div
                  className="font-semibold"
                  onClick={() => setOpenModal(true)}
                >
                  Rate this profile
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center py-6">
          <div className="flex justify-around border-2 rounded-2xl bg-gray-200 w-[80%] h-14 mb-5">
            <div className="cursor-pointer font-semibold rounded-xl hover:scale-110 w-[130px] flex items-center flex-col hover:bg-gray-300">
              <p>Publications</p>
              <p>10</p>
            </div>
            <div
              onClick={() => dispatch(getFollowers(service._id))}
              className="flex items-center"
            >
              <FollowersModal
                title="Followers"
                number={service?.followers?.length}
                list={followers}
              />
            </div>
            <div
              onClick={() => dispatch(getFollowings(service._id))}
              className="flex items-center"
            >
              <FollowersModal
                title="Following"
                number={service?.following?.length}
                list={followings}
              />
            </div>
          </div>

          {/*album tabs */}

          <div className="w-full md:w-[80%]">
            <AlbumTab />
          </div>
        </div>
        {/* modal */}
        <div
          className={
            !openModal
              ? "absolute w-full h-full z-50 bg-gray-700 bg-opacity-80 top-[-200%] py-10 left-0 ease-in duration-300"
              : "absolute w-full h-full z-50 bg-gray-700 bg-opacity-80 top-0 py-10 left-0 ease-in duration-300"
          }
        >
          <div className="relative translate-y-[-10%] min-h-screen bg-transparent py-6 flex flex-col justify-center sm:py-12">
            {/* close btn */}
            <button onClick={() => setOpenModal(false)} className="">
              Close
            </button>
            <div className="py-3 sm:max-w-xl sm:mx-auto">
              <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                <div className="px-12 py-5">
                  <h2 className="text-gray-800 text-3xl font-semibold">
                    Your opinion matters to us!
                  </h2>
                </div>
                <div className="bg-gray-200 w-full rounded-b-xl flex flex-col items-center">
                  <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-lg text-gray-800">
                      How was quality of the call?
                    </span>
                    <div className="flex space-x-3">
                      <Rating
                        onChange={(e) => setRate(parseInt(e.target.value))}
                        value={rate}
                        size="small"
                        sx={{
                          fontSize: "3rem",
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-3/4 flex flex-col">
                    <button
                      onClick={handleRate}
                      className="py-3 my-8 text-lg bg-gradient-to-r from-light-blue-600 to-indigo-600 rounded-xl text-white"
                    >
                      Rate now
                    </button>
                    <button
                      onClick={() => setOpenModal(false)}
                      className="py-3 my-8 text-lg bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
