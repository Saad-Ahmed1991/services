import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/Actions/userActions";
import LoadingSpinner from "./LoadingSpinner";

const UsersTable = () => {
  const tableHeadings = [
    "ID",
    "FirstName",
    "LastName",
    "E-mail",
    "Role",
    "Status",
    "Action",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const users = useSelector((state) => state.userReducer.allUsers);
  const loading = useSelector((state) => state.userReducer.loading);
  console.log(users);
  const handleClick = (page) => {
    setCurrentPage(page);
    dispatch(getAllUsers(page));
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = users.totalPages;
    const currentPage = users.currentPage;
    const displayPages = 10;

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > displayPages) {
      if (currentPage <= Math.floor(displayPages / 2)) {
        endPage = displayPages;
      } else if (currentPage >= totalPages - Math.floor(displayPages / 2)) {
        startPage = totalPages - displayPages + 1;
      } else {
        startPage = currentPage - Math.floor(displayPages / 2);
        endPage = currentPage + Math.floor(displayPages / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} onClick={() => handleClick(i)}>
          <p
            className={`cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === i ? "font-bold" : ""
            }`}
          >
            {i}
          </p>
        </li>
      );
    }

    if (
      totalPages > displayPages &&
      currentPage < totalPages - Math.floor(displayPages / 2)
    ) {
      pageNumbers.push(
        <li key="ellipsis">
          <p className="px-3 py-2 text-gray-500">...</p>
        </li>
      );

      pageNumbers.push(
        <li key={totalPages} onClick={() => handleClick(totalPages)}>
          <p
            className={`cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === totalPages ? "font-semibold" : ""
            }`}
          >
            {totalPages}
          </p>
        </li>
      );
    }

    return pageNumbers;
  };
  const next = () => {
    if (currentPage < users.totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      dispatch(getAllUsers(nextPage, limit));
    }
  };

  const previous = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      dispatch(getAllUsers(previousPage, limit));
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  {tableHeadings.map((heading) => (
                    <th key={heading} scope="col" className="px-6 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users?.users?.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user._id}
                    </th>
                    <td className="px-6 py-4">{user.firstName}</td>
                    <td className="px-6 py-4">{user.lastName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      {user.isBanned ? (
                        <p className="font-semibold text-sm text-red-400">
                          Banned
                        </p>
                      ) : (
                        <p className="font-semibold text-md text-green-600">
                          Active
                        </p>
                      )}
                    </td>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a
                        href="/#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <a
                        href="/#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full px-2 py-2 flex items-center justify-center">
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
        </>
      )}
    </>
  );
};

export default UsersTable;
