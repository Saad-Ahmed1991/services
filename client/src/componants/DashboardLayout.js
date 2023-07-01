import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";

// Custom component to combine multiple classes and dynamically apply active link style
const ActiveLink = ({ to, activeClassName, className, ...rest }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const combinedClassName = isActive
    ? `${className} ${activeClassName}`
    : className;
  return <NavLink to={to} className={combinedClassName} {...rest} />;
};

const navLinks = ["Users", "BillBoard", "Help"];

const DashboardLayout = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="w-full md:flex h-screen pt-16 overflow-y-auto">
        <nav className="flex h-20 items-center w-full md:h-full font-semibold tracking-wider bg-gray-200 md:w-80">
          <ul className="flex w-full items-center justify-center h-full text-black tracking-widest text-lg md:flex-col gap-10">
            <ActiveLink
              exact="true"
              to="/dashboard"
              activeClassName="bg-gray-400 rounded-md animate-fade-in"
              className=" flex px-2 items-center justify-center md:h-14 md:w-full"
            >
              <li>Overview</li>
            </ActiveLink>
            {navLinks.map((link) => (
              <ActiveLink
                key={link}
                to={`/dashboard/${link}`}
                activeClassName="bg-gray-400 rounded-md animate-fade-in"
                className="flex px-2 items-center justify-center md:h-14 md:w-full "
              >
                <li>{link}</li>
              </ActiveLink>
            ))}
          </ul>
        </nav>
        <div className="border-l-2 h-full w-full overflow-y-auto md:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
