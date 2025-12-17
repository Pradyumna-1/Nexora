import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCustomFunctions = () => {
  const API = "http://localhost:5000/api";

  let [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // This is the Generic input handler
  let handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value.trimStart(),
      };
    });
  };

  // Register API Call

  const registerUser = async () => {
    const res = await axios.post(`${API}/register`, formData);
    return res.data;
  };

  // Login API Call

  const loginUser = async () => {
    const res = await axios.post(`${API}/login`, formData);
    localStorage.setItem("token", res.data.token);
    return res.data;
  };

  return { formData, handleChange, registerUser, loginUser };
};

export default useCustomFunctions;
