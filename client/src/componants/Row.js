import React, { useEffect, useRef } from "react";
import Card from "./Card";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchValues } from "../redux/Actions/serviceActions";

const Row = ({ img, index, profession }) => {
  const rowRef = useRef(null);
  const dispatch = useDispatch();
  const services = useSelector(
    (state) => state.serviceReducer.rowServices
  ).filter((service) => service.profession === profession);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
      threshold: 0.2, // Trigger at 10% visibility
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => {
      if (rowRef.current) {
        observer.unobserve(rowRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className={`relative opacity-0 bg-gradient-to-r from-gray-50 to-gray-100 shadow-xl shadow-gray-600 rounded-lg rounded-l-3xl flex items-center  my-20 flex-col md:flex-row ${
        index % 2 === 0 ? "slide-right" : "slide-left"
      }`}
    >
      <img
        src={img}
        alt=""
        className="w-[400px] h-[170px] rounded-3xl md:h-[320px] md:w-[320px]"
      />
      <Link to="/search">
        <p
          onClick={() => dispatch(searchValues(profession, "", 0))}
          className="border-2 cursor-pointer self-end flex bg-gray-200 rounded-3xl w-32 items-center justify-evenly mr-5 md:absolute md:top-[-40px] md:right-4"
        >
          <span>See more</span>

          <span className=" rounded-full bg-white border">
            <BsArrowRight size={20} />
          </span>
        </p>
      </Link>
      <div className="flex w-full flex-col justify-center overflow-x-scroll scrollbar-style ">
        <div className="min-w-0 flex items-center gap-4 ">
          {services.map((el) => (
            <Link key={el._id} to={`/profile/${el.user._id}`}>
              <div>
                <Card el={el} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;
