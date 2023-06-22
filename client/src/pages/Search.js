import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../componants/Navbar";
import SearchMenu from "../componants/SearchMenu";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllService, searchValues } from "../redux/Actions/serviceActions";
import Card from "../componants/Card";
import { Link } from "react-router-dom";
import LoadingSpinner from "../componants/LoadingSpinner";

const Search = () => {
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const servicesArray = useSelector((state) => state.serviceReducer.allService);
  const pagination = useSelector((state) => state.serviceReducer.pagination);
  const loading = useSelector((state) => state.serviceReducer.loading);
  const searchValue = useSelector((state) => state.serviceReducer.searchValues);

  const handleClick = (page) => {
    setCurrentPage(page);
    dispatch(
      getAllService(
        searchValue.profession,
        searchValue.city,
        searchValue.rating,
        page,
        pagination.limit
      )
    );
    window.scrollTo(0, 0);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(
        <li key={i} onClick={() => handleClick(i)}>
          <p className="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {i}
          </p>
        </li>
      );
    }
    return pageNumbers;
  };
  const next = () => {
    if (currentPage < pagination.totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      dispatch(
        getAllService(
          searchValue.profession,
          searchValue.city,
          searchValue.rating,
          nextPage,
          pagination.limit
        )
      );
    }
  };

  const previous = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      dispatch(
        getAllService(
          searchValue.profession,
          searchValue.city,
          searchValue.rating,
          previousPage,
          pagination.limit
        )
      );
    }
  };
  useEffect(() => {
    dispatch(
      getAllService(
        searchValue.profession,
        searchValue.city,
        searchValue.rating,
        pagination.page,
        pagination.limit
      )
    );
  }, [searchValue, dispatch]);

  return (
    <div className="w-full overflow-hidden flex h-full relative">
      <Navbar />
      {/** main */}
      <div className="flex pt-16">
        <div className="hidden md:block bg-gray-700 p-8 rounded-lg ">
          <SearchMenu setShow={setShow} />
        </div>
        <div className="">
          <div className="w-full h-full  flex flex-col items-center justify-between">
            <div className="w-full h-full flex items-start justify-start md:overflow-y-hidden  p-4 gap-7 flex-wrap">
              {loading ? (
                <div className="w-screen h-full flex items-center justify-center">
                  <div className="flex items-center justify-center w-full h-full">
                    <LoadingSpinner />
                  </div>
                </div>
              ) : (
                servicesArray.map((el) => (
                  <Link key={el._id} to={`/profile/${el.user._id}`}>
                    <Card el={el} />
                  </Link>
                ))
              )}
            </div>
            <div className="flex gap-5 py-3 translate-x-[-50%]">
              <ul className="inline-flex -space-x-px">
                <li onClick={previous}>
                  <p className="cursor-pointer px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                  </p>
                </li>
                {renderPageNumbers()}
                <li onClick={next}>
                  <p className="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setShow(!show)}
        className="text-white flex items-center justify-center border-2 w-14 h-[10rem] translate-y-[-50%] rounded-r-full z-[100] fixed top-[50%] left-[-10px]  bg-black opacity-30 cursor-pointer md:hidden"
      >
        <FaSearch size={25} />
      </div>
      {/** sidebar*/}
      <div
        className={
          show
            ? "fixed  top-0 left-0 w-full h-screen bg-white/25 ease-in duration-500 md:hidden "
            : "fixed  top-0 left-[-100%] w-full h-screen bg-white/25 ease-in duration-500 md:hidden "
        }
      >
        <div className="w-[90%] h-full bg-gray-700 bg-opacity-90 pt-20 px-2">
          <SearchMenu setShow={setShow} />
        </div>
      </div>
    </div>
  );
};

export default Search;
