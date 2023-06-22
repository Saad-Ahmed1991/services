import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/Actions/userActions";
import avatar from "../assets/avatar.png";
import { getProfile } from "../redux/Actions/profileActions";

const Dropdown = ({ setTokenState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profileReducer.currentProfile);
  const [show, setShow] = useState(false);
  const loading = useSelector((state) => state.profileReducer.loading);
  const user = useSelector((state) => state.userReducer.currentUser);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(logOut());
    setTokenState(null);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex justify-center ">
      <div className="relative inline-block" ref={dropdownRef}>
        {/* Dropdown toggle button */}

        <img
          onClick={() => setShow(!show)}
          src={profile?.profileImg || avatar}
          className="w-12 h-12 rounded-full cursor-pointer border-2 border-green-500 "
          alt="Avatar"
        />
        {/* Dropdown menu */}
        <div
          className={
            show
              ? "absolute right-5 z-20 w-56 py-2 mt-2 overflow-hidden bg-gray-50 rounded-md shadow-xl dark:bg-gray-800"
              : "hidden"
          }
        >
          <Link
            to="#"
            className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <img
              className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 border-2 border-green-500"
              src={profile?.profileImg || avatar}
              alt="jane avatar"
            />
            <div className="mx-1">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {user?.firstName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </Link>
          <hr className="border-gray-200 dark:border-gray-700 " />
          {user.role === "client" ? (
            <Link
              to={`/account`}
              className="block font-semibold px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Account
            </Link>
          ) : user?.hasProfile ? (
            <Link
              to={`/profile/${user._id}`}
              className="block font-semibold px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              view profile
            </Link>
          ) : (
            <Link
              to={`/createprofile`}
              className="block font-semibold px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              create profile
            </Link>
          )}
          <Link
            to="#"
            className="block font-semibold px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Settings
          </Link>

          <hr className="border-gray-200 dark:border-gray-700 " />
          <Link
            to="#"
            className="block font-semibold px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Help
          </Link>
          <p
            onClick={logout}
            className="block font-semibold cursor-pointer px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Sign Out
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
