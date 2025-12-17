import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profileImage: "/default.png",
    mobile: "",
    dob: "",
    address: { street: "", city: "", state: "", pincode: "" },
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({
          ...res.data,
          profileImage: res.data.profileImage
            ? `http://localhost:5000${res.data.profileImage}?t=${Date.now()}`
            : "/default.png",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
