import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useCustomFunctions from "../Custom/useCustomFunctions";

const Register = () => {
  let { formData, handleChange, registerUser } = useCustomFunctions();

  // let [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser();

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      error.response?.data?.message || "Registration failed";
    }
  };
  return (
    <div className="w-full flex justify-center items-center h-screen rounded-sm bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 shadow-2xl w-90 rounded-md p-10 bg-white "
        // p-8 flex flex-col gap-4 w-90
      >
        <h3 className="text-center text-xl font-stretch-50%  font-semibold">
          Welcome to Register Page
        </h3>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          value={formData.name}
          className="border p-2 rounded outline-none "
        />
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
          className="border p-2 rounded outline-none "
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={formData.password}
          className="border px-3 py-2 rounded outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 p-2 text-white rounded-md cursor-pointer transition hover:bg-blue-400 text-md"
        >
          Submit
        </button>

        <Link to="/login" className="text-start font-stretch-90% font-sans">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
