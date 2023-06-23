import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchDropdown from "./SearchDropdown";
import Dropdown from "./Dropdown";
import service_header from "../assets/service_header.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/Actions/userActions";
import SearcNavSearchMenu from "./NavSearchMenu";
import logo from "../assets/logo.png";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const profile = useSelector((state) => state?.profileReducer?.currentProfile);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenMenu(false);
    setSearchMenu(false);
  };
  const handleLogout = () => {
    dispatch(logOut());
    setOpenMenu(false);
    navigate("/");
  };
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [tokenState, setTokenState] = useState(token);

  return (
    <div className="fixed flex items-center  w-full h-16 shadow-xl z-50 bg-gradient-to-r from-gray-200 to-gray-50 ">
      <div className=" relative flex items-center justify-between h-full w-full px-2 xl:px-12">
        <div
          className={
            !search
              ? "w-full h-screen absolute top-[-1500%] left-0 pt-2 px-8 ease-in duration-300"
              : "w-full h-screen absolute top-16 left-0 pt-2 px-8 ease-in duration-300"
          }
        >
          <div className="hidden md:block w-full h-screen bg-blue-gray-700 opacity-95 rounded-2xl relative ">
            <div className="absolute top-[-16px] right-[50%] translate-x-[-70px] rotate-45 bg-blue-gray-700 opacity-95 w-8 h-8"></div>
            <SearchDropdown setSearch={setSearch} />
          </div>
        </div>
        <Link to="/">
          <img
            className="rotation-container md:hidden lg:block h-14 w-50 p-0 m-0 hover:scale-105 ease-in duration-200"
            src={logo}
            alt=""
          />
        </Link>
        <div className="hidden md:flex">
          <ul className="flex gap-12 text-xl tracking-widest font-bold px-6 py-3 ">
            <li className="h-full cursor-pointer border-b-2 border-transparent hover:border-black hover:scale-110 ease-in duration-200">
              <Link to="/">Home</Link>
            </li>
            <li
              onClick={() => setSearch(!search)}
              className="hover:border-3 h-full cursor-pointer border-b-2 border-transparent hover:border-black hover:scale-110 ease-in duration-200"
            >
              Search
            </li>
            <li className="h-full cursor-pointer border-b-2 border-transparent hover:border-black hover:scale-110 ease-in duration-200">
              <Link to="/search">Services</Link>
            </li>
            <li className="h-full cursor-pointer border-b-2 border-transparent hover:border-black hover:scale-110 ease-in duration-200">
              <Link to="/about">About</Link>
            </li>
            <li className="h-full cursor-pointer border-b-2 border-transparent hover:border-black hover:scale-110 ease-in duration-200">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        {!openMenu ? (
          <div
            onClick={() => setOpenMenu(true)}
            className="block cursor-pointer md:hidden"
          >
            <GiHamburgerMenu size={25} />
          </div>
        ) : null}
        <div className="hidden md:flex items-center justify-center">
          {token ? (
            <Dropdown setTokenState={setTokenState} />
          ) : (
            <div className="flex flex-col items-center">
              <p>welcome</p>
              <div className="flex gap-4">
                <Link to="/signin">
                  <p>SignIn</p>
                </Link>
                <Link to="/signup">
                  <p>SignUp</p>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/*menu overlay*/}
        <div
          className={
            openMenu
              ? "absolute  top-0 left-0 w-full h-screen bg-black bg-opacity-[85%] ease-in duration-500 md:hidden "
              : "absolute  top-0 left-[-120%] w-full h-screen bg-black bg-opacity-[85%] ease-in duration-500 md:hidden "
          }
        >
          <div className="flex flex-col items-center text-4xl tracking-widest font-medium  justify-center gap-10 w-full text-white h-full bg-black text bg-opacity-[5%] px-4 relative">
            {searchMenu ? (
              <div
                onClick={() => setSearchMenu(false)}
                className="absolute top-5 right-5 cursor-pointer"
              >
                X
              </div>
            ) : (
              <div
                onClick={() => setOpenMenu(false)}
                className="absolute top-5 right-5 cursor-pointer"
              >
                X
              </div>
            )}
            {!searchMenu ? (
              <>
                <h2 className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2">
                  <Link to="/">Home</Link>
                </h2>
                <h2
                  className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2 "
                  onClick={() => setSearchMenu(!searchMenu)}
                >
                  Search
                </h2>
                {token ? (
                  <>
                    <h2 className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2">
                      <Link to={`/profile/${profile.user && profile.user._id}`}>
                        Profile
                      </Link>
                    </h2>
                    <h2 className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2">
                      <Link to="/settings">Settings</Link>
                    </h2>
                  </>
                ) : null}
                <h2 className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2">
                  <Link to={`/search`}>Services</Link>
                </h2>
                <h2 className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2">
                  <Link to="/help">Help</Link>
                </h2>
                {token ? (
                  <h2
                    className="w-[90%] text-center bg-white/5 cursor-pointer rounded-lg py-2 "
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </h2>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center gap-8">
                    <h2 className="w-[90%] text-center bg-white/5 cursor-pointer rounded-lg py-2">
                      <Link to="/signin">SignIn</Link>
                    </h2>
                    <h2 className="w-[90%] text-center bg-white/5 cursor-pointer rounded-lg py-2">
                      <Link to="/signup">SignUp</Link>
                    </h2>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full px-12">
                <SearcNavSearchMenu setSearchMenu={setSearchMenu} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
