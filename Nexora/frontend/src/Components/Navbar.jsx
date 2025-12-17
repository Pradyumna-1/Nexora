import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
const Navbar = () => {
  const context = useContext(UserContext);
  if (!context) return null;

  const user = context.user;

  const [dropdown, setDropDown] = useState(false);

  return (
    <div className="w-full sticky top-0 z-50  bg-white shadow-md ">
      <div className=" flex gap-4 items-end justify-end p-4 ">
        <Link className="font-semibold p-1" to="/home">
          Home
        </Link>
        <Link className="font-semibold p-1" to="product">
          Product
        </Link>
        {/* <Link
          to="/logout"
          className=" px-1 py-1 text-white rounded-sm font-semibold  bg-red-500 hover:bg-red-400"
        >
          Logout
        </Link>

        <Link to="/profile">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
        </Link> */}

        <div className="relative">
          <img
            src={user.profileImage || "/default.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer"
            onClick={() => setDropDown((prev) => !prev)}
          />

          {dropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg flex flex-col">
              <Link
                to="/profile"
                className="px-4 py-2 hover:bg-amber-300 hover:text-white hover:font-semibold"
                onClick={() => setDropDown(false)}
              >
                View Profile
              </Link>
              <Link
                to="/logout"
                className="px-4 py-2  hover:shadow-2xl hover:bg-red-500 hover:text-white "
                onClick={() => setDropDown(false)}
              >
                {/* <div className="border bg-red-500 text-white rounded p-2 text-center"> */}
                  Logout
                {/* </div> */}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
