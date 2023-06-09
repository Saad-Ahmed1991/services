import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { HiOutlineMinus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getHomeBillboard } from "../redux/Actions/billboardActions";
import LoadingSpinner from "../componants/LoadingSpinner";

const Carousel = () => {
  const dispatch = useDispatch();
  const [homeBillboard, setHomeBillboard] = useState([]);
  const billboard = useSelector(
    (state) => state.billboardReducer.homeBillboard.billboard
  );
  const loading = useSelector((state) => state.billboardReducer.loading);
  const [currentIndex, setCurrentIndex] = useState(0);
  /*const slides = [
    {
      url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
  ];*/
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? homeBillboard.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === homeBillboard.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    dispatch(getHomeBillboard());
  }, []);
  useEffect(() => {
    if (billboard) {
      setHomeBillboard(billboard);
    }
  }, [billboard]);

  useEffect(() => {
    // Auto play the carousel every 3 seconds
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    // Clean up the timer when the component unmounts or currentIndex changes
    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);

  return (
    <>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="max-w-[1400px] h-[500px] w-full m-auto pt-10 px-4 relative group">
          <div
            style={{ backgroundImage: `url(${homeBillboard[currentIndex]})` }}
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          ></div>
          {/* left arrow*/}
          <div
            onClick={prevSlide}
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-8 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <BsChevronCompactLeft size={30} />
          </div>
          {/* right arrow*/}
          <div
            onClick={nextSlide}
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-8 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:scale-110 ease-in duration-100"
          >
            <BsChevronCompactRight size={30} />
          </div>
          {/* indicators */}
          <div className="flex top-4 justify-center pt-2 gap-3">
            {homeBillboard.map((slide, slidesIndex) => (
              <div
                key={slidesIndex}
                className={
                  currentIndex === slidesIndex
                    ? "text-2xl cursor-pointer hover:scale-150 opacity-50 scale-125 text-blue-900 ease-in duration-100"
                    : "text-2xl cursor-pointer hover:scale-150 opacity-50 ease-in duration-100"
                }
              >
                <HiOutlineMinus onClick={() => setCurrentIndex(slidesIndex)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
