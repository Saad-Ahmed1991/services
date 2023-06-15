import React from "react";
import { Navbar } from "../componants/Navbar";
import RowList from "../componants/RowList";
import Carousel from "../componants/Carousel";
import HomeFooter from "../componants/HomeFooter";

const Home = () => {
  return (
    <div className=" w-full mb-[50px] overflow-hidden">
      <Navbar />
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 w-full pt-[3.5rem] overflow-x-auto sm:px-4 lg:px-24 ">
        <Carousel />
        <RowList />
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
