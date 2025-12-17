import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = ({ onLogout }) => {
  
  const navigate = useNavigate();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    onLogout();
    toast.success("Successfully Logout😂");
    navigate("/login");
    effectRan.current = true;
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
