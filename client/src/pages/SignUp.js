import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignUp } from "../redux/Actions/userActions";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({});
  return (
    <div className="bg-gray-50 pb-5 min-h-screen flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 pb-4 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <div className="flex gap-4">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="firstName"
              placeholder="firstName"
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="lastName"
              placeholder="last name"
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
          </div>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />
          <div className="flex justify-center gap-10 my-2">
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5  rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="client"
                id="radioDefault01"
                value="client"
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              />
              <label
                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="radioDefault01"
              >
                Client
              </label>
            </div>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5  rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="client"
                id="radioDefault02"
                value="worker"
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              />
              <label
                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="radioDefault02"
              >
                Worker
              </label>
            </div>
          </div>
          <button
            onClick={() => dispatch(userSignUp(newUser, navigate))}
            type="button"
            className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
          >
            Create Account
          </button>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="/#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="/#"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            to="/signin"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
