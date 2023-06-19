import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../redux/Actions/serviceActions";
import { useParams } from "react-router-dom";
import UploadImagesModal from "./UploadImagesModal";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const AlbumsList = () => {
  const user = useSelector((state) => state.userReducer.currentUser);
  const { userid } = useParams();
  const albums = useSelector((state) => state.serviceReducer.albums.albums);
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [showSideAlbums, setShowSideAlbums] = useState(false);
  const handleAlbumSelect = (album) => {
    setSelectedAlbum(album);
    setShowSideAlbums(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlbums(user._id));
  }, []);
  useEffect(() => {
    if (albums && albums[0]) {
      setSelectedAlbum(albums[0]);
    }
  }, [albums]);

  return (
    <div className="relative w-full h-full flex py-2 border-2 border-gray-500">
      <aside className="hidden md:block md:w-72 overflow-x-hidden md:h-screen md:overflow-y-auto md:border-r-8 ">
        {albums?.map((album, i) => (
          <div
            onClick={() => setSelectedAlbum(album)}
            className={`hover:scale-[101%] border-2 w-full my-3 cursor-pointer mx-auto h-48 shadow-2xl shadow-gray-400 overflow-hidden group relative min-w-min flex items-center justify-center max-w-full rounded-lg`}
            key={i}
          >
            <img className="w-48" src={album?.album[0]} alt="" />
            <div className="hidden group-hover:block absolute text-white text-center bottom-10 tracking-wider w-full text-md bg-black/70 py-3">
              <p>{album?.title}</p>
              <p>({album?.album.length} photos)</p>
            </div>
          </div>
        ))}
      </aside>

      {/* albums overlay*/}

      <div
        className={
          !showSideAlbums
            ? "absolute z-50 bg-gray-900 bg-opacity-95 pt-2 top-0 left-[-120%] w-full h-full ease-in duration-500  overflow-y-auto md:hidden"
            : "absolute z-50 bg-gray-900 bg-opacity-95 pt-2 top-0 left-0 w-full h-full flex ease-in duration-500  gap-y-2 overflow-y-auto md:hidden"
        }
      >
        <div className="w-full h-full flex flex-col items-center text-white">
          <div className="flex w-full items-center justify-around  mb-6 ">
            <p className="font-medium tracking-wider text-xl">
              Select An Album
            </p>
            <button
              onClick={() => setShowSideAlbums(false)}
              className="border-2 border-white rounded-lg px-2"
            >
              Close
            </button>
          </div>
          <div className="flex flex-wrap justify-evenly gap-y-2">
            {albums?.map((album, i) => (
              <div
                onClick={() => handleAlbumSelect(album)}
                className={`hover:scale-[101%] cursor-pointer h-44 shadow-2xl shadow-gray-600 overflow-hidden group relative min-w-min flex items-center justify-center max-w-full rounded-lg`}
                key={i}
              >
                <img className="w-44" src={album?.album[0]} alt="" />
                <div className="hidden group-hover:block absolute text-white text-center bottom-10 tracking-wider w-full text-md bg-black/70 py-3">
                  <p>{album?.title}</p>
                  <p>({album?.album.length} photos)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* main preview section */}

      <main className="relative flex-grow min-h-screen w-full flex flex-col items-center bg-slate-300 px-4 py-1">
        <div className="flex w-full justify-end border-b-2 pb-4">
          <div
            className="cursor-pointer mr-auto flex text-white bg-gray-700 rounded-lg px-1 items-center gap md:hidden"
            onClick={() => setShowSideAlbums(true)}
          >
            <BsFillArrowLeftCircleFill />
            <p>Albums</p>
          </div>
          <div className="justify-self-end">
            <UploadImagesModal />
          </div>
        </div>
        <p className="text-lg mt-1 tracking-widest font-semibold mb-3 w-full bg-gray-300 text-center">
          {selectedAlbum.title}
        </p>
        <div className="w-full flex flex-wrap gap-2">
          {selectedAlbum?.album?.map((img) => (
            <img
              className="hover:scale-105 cursor-pointer w-[150px] h-[150px] rounded-lg lg:w-[200px] lg:h-[200px]"
              key={img}
              src={img}
              alt=""
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AlbumsList;
