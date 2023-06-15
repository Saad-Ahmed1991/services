import React, { useState } from "react";
import { Navbar } from "../componants/Navbar";
import { cities, professions } from "../consts/consts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createWorkerProfile } from "../redux/Actions/profileActions";

const CreateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [service, setService] = useState({});
  return (
    <>
      <Navbar />
      <div className="w-full h-screen ">
        <div className="w-full h-full  bg-gray-600 flex flex-col items-center justify-center gap-6 border-2 md:flex-row md:justify-around">
          <h1 className="">Create Your Profile</h1>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3">
              <label>City</label>
              <select
                onChange={(e) =>
                  setProfile({ ...profile, city: e.target.value })
                }
                className="w-full"
                name="city"
              >
                {cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center gap-3">
              <label>Adress</label>
              <input
                onChange={(e) =>
                  setProfile({ ...profile, adress: e.target.value })
                }
                className="w-full"
                type="text"
                placeholder="Adress"
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <label>Phone Number</label>
              <input
                onChange={(e) =>
                  setProfile({ ...profile, phoneNumber: e.target.value })
                }
                className="w-full"
                type="text"
                placeholder="Phone Number"
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <label>Profession</label>
              <select
                onChange={(e) =>
                  setService({ ...service, profession: e.target.value })
                }
                className="w-full"
                name="city"
              >
                {professions.map((profession) => (
                  <option key={profession}>{profession}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() =>
                dispatch(createWorkerProfile(profile, service, navigate))
              }
              className="w-[200px] px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none md:w-[250px]"
            >
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
