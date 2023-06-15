import React, { useEffect } from "react";
import Row from "./Row";
import plombier from "../assets/images/plombier.png";
import peintre from "../assets/images/peintre.jfif";
import electricien from "../assets/images/electricien.jpg";
import grinder from "../assets/images/grinder.jpg";
import { useDispatch } from "react-redux";
import { getRowServices } from "../redux/Actions/serviceActions";
import { Link } from "react-router-dom";

const RowList = () => {
  const rows = [plombier, peintre, electricien, grinder];
  const dispatch = useDispatch();
  const profession = ["plombier", "forgeron", "transporteur", "mecanicien"];
  useEffect(() => {
    dispatch(
      getRowServices(["plombier", "forgeron", "transporteur", "mecanicien"])
    );
  }, []);

  return (
    <div className="">
      {rows.map((el, index) => (
        <Row
          key={index}
          img={el}
          index={index}
          profession={profession[index]}
        />
      ))}
      <div className="flex w-full justify-center">
        <Link to="/search">
          <button className="border-2 text-xl font-semibold tracking-widest border-gray-900 py-3 px-24 rounded-lg bg-gray-200 hover:bg-white">
            See all services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RowList;
