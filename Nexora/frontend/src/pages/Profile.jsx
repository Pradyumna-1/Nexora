// import React from "react";

// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import axios from "axios";

// const Profile = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     dob: "",

//     address: {
//       street: "",
//       city: "",
//       state: "",
//       pincode: "",
//     },
//     profileImage: "",
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const token = localStorage.getItem("token");

//   // useEffect(() => {
//   //   const fetchProfile = async () => {
//   //     try {
//   //       const res = await axios.get(
//   //         "http://localhost:5000/api/profile",

//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         }
//   //       );
//   //       setUser((prev) => ({
//   //         ...prev,
//   //         ...res.data.user,
//   //         address: res.data.user.address || prev.address,
//   //         profileImage: res.data.user.profileImage || prev.profileImage, // <-- important
//   //       }));
//   //     } catch (error) {
//   //       toast.error("Failed to load profile");
//   //     }
//   //   };
//   //   fetchProfile();
//   // }, [token]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUser({
//           ...res.data,
//           profileImage: res.data.profileImage || "", // <-- add this line
//           address: {
//             street: res.data.address?.street || "",
//             city: res.data.address?.city || "",
//             state: res.data.address?.state || "",
//             pincode: res.data.address?.pincode || "",
//           },
//         });
//       } catch (error) {
//         toast.error("Failed to load profile");
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("address.")) {
//       const field = name.split(".")[1];
//       setUser((prev) => ({
//         ...prev,
//         address: { ...prev.address, [field]: value },
//       }));
//     } else {
//       setUser((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   //  // Handle image file
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImageFile(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const formData = new FormData();
//   //   formData.append("name", user.name);
//   //   formData.append("mobile", user.mobile);
//   //   formData.append("dob", user.dob);
//   //   formData.append("street", user.address.street);
//   //   formData.append("city", user.address.city);
//   //   formData.append("state", user.address.state);
//   //   formData.append("pincode", user.address.pincode);
//   //   if (imageFile) {
//   //     formData.append("profileImage", imageFile);
//   //   }
//   //   try {
//   //     await axios.put("http://localhost:5000/api/profile", formData, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });
//   //     toast.success("Profile updated successfully");
//   //   } catch (error) {
//   //     toast.error("Profile updated failed");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) return toast.error("You must be logged in");

//     const formData = new FormData();
//     formData.append("name", user.name);
//     formData.append("mobile", user.mobile);
//     formData.append("dob", user.dob);
//     formData.append("address", JSON.stringify(user.address));
//     if (imageFile) formData.append("profileImage", imageFile);

//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/profile",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success("Profile updated successfully");

//       // Update state with returned user data
//       setUser((prev) => ({
//         ...prev,
//         ...res.data.user,
//         address: res.data.user.address || prev.address,
//         profileImage: res.data.user.profileImage || prev.profileImage,
//       }));
//       setPreview(""); // clear preview after saving
//     } catch (error) {
//       console.error(error);
//       toast.error("Profile update failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-[400px] flex flex-col gap-3"
//       >
//         <h1 className="text-xl font-semibold text-center">My Profile</h1>

//         {/* {Profile image} */}
//         {/* Show selected image OR saved image */}
//         <img
//           src={
//             preview
//               ? preview
//               : user.profileImage
//               ? `http://localhost:5000${
//                   user.profileImage
//                 }?t=${new Date().getTime()}` // add timestamp
//               : "/default.png"
//           }
//           alt="Profile"
//           className="w-24 h-24 rounded-full mx-auto object-cover"
//         />

//         <input
//           type="text"
//           name="name"
//           value={user.name}
//           placeholder="Enter your name"
//           onChange={handleChange}
//           className="border p-1 rounded outline-none"
//         />
//         <input
//           type="email"
//           name="email"
//           value={user.email}
//           readOnly
//           placeholder="Enter your email"
//           className="border p-1 rounded outline-none text-gray-900"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           // value={user.profileImage}
//           onChange={handleImageChange}
//           className="border p-1 rounded cursor-pointer outline-none"
//         />
//         <input
//           type="tel"
//           name="mobile"
//           value={user.mobile}
//           placeholder="Enter your mobile"
//           onChange={handleChange}
//           className="border p-1 rounded outline-none"
//         />
//         <input
//           type="date"
//           name="dob"
//           value={user.dob ? user.dob.substring(0, 10) : ""}
//           // value={user.dob ? user.dob.substring(0, 10) : ""}
//           placeholder="Enter your D.O.B"
//           onChange={handleChange}
//         />

//         <input
//           name="address.street"
//           value={user.address.street || ""}
//           placeholder="street"
//           className="border p-1 rounded outline-none"
//           onChange={handleChange}
//         />
//         <input
//           name="address.city"
//           value={user.address.city || ""}
//           placeholder="city"
//           onChange={handleChange}
//           className="border p-1 rounded outline-none"
//         />
//         <input
//           name="address.state"
//           value={user.address.state || ""}
//           placeholder="state"
//           className="border p-1 rounded outline-none"
//           onChange={handleChange}
//         />
//         <input
//           name="address.pincode"
//           value={user.address.pincode || ""}
//           placeholder="pincode"
//           onChange={handleChange}
//           className="border p-1 rounded outline-none"
//         />

//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const Profile = () => {
  const context = useContext(UserContext);
  if (!context) return;

  const { user, setUser } = context;
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("You must be logged in");

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("mobile", user.mobile || "");
    formData.append("dob", user.dob || "");
    formData.append("address", JSON.stringify(user.address || {}));
    if (imageFile) formData.append("profileImage", imageFile);

    try {
      const res = await axios.put(
        "http://localhost:5000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        ...res.data.user,
        address: res.data.user.address || prev.address,
        profileImage: res.data.user.profileImage
          ? `http://localhost:5000${res.data.user.profileImage}?t=${Date.now()}`
          : prev.profileImage || "/default.png",
      }));

      setPreview("");
      toast.success("Profile updated successfully");
      setEditMode(false); // switch back to view mode
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    }
  };

  // ----- VIEW MODE CARD -----
  if (!editMode) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-[400px] flex flex-col gap-3">
          <img
            src={user.profileImage || "/default.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
          <h2 className="text-xl font-semibold text-center">{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobile || "-"}</p>
          <p>DOB: {user.dob ? user.dob.substring(0, 10) : "-"}</p>
          <p>
            Address:{" "}
            {user.address
              ? `${user.address.street || ""}, ${user.address.city || ""}, ${
                  user.address.state || ""
                }, ${user.address.pincode || ""}`
              : "-"}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white cursor-pointer p-2 rounded hover:bg-blue-400 mt-3"
          >
            Edit Profile
          </button>
        </div>
      </div>
    );
  }

  // ----- EDIT MODE FORM -----
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[400px] flex flex-col gap-3"
      >
        <h1 className="text-xl font-semibold text-center">Edit Profile</h1>

        <img
          src={preview || user.profileImage || "/default.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />

        <input
          type="text"
          name="name"
          value={user.name || ""}
          placeholder="Enter your name"
          onChange={handleChange}
          className="border p-2 rounded outline-none w-full"
        />
        <input
          type="email"
          name="email"
          value={user.email || ""}
          readOnly
          className="border p-2 rounded outline-none w-full text-gray-900"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded cursor-pointer outline-none w-full"
        />
        <input
          type="tel"
          name="mobile"
          value={user.mobile || ""}
          placeholder="Enter your mobile"
          onChange={handleChange}
          className="border p-2 rounded outline-none w-full"
        />
        <input
          type="date"
          name="dob"
          value={user.dob ? user.dob.substring(0, 10) : ""}
          onChange={handleChange}
          className="border p-2 rounded outline-none w-full"
        />

        <input
          name="address.street"
          value={user.address?.street || ""}
          placeholder="Street"
          onChange={handleChange}
          className="border p-2 rounded outline-none w-full"
        />
        <input
          name="address.city"
          value={user.address?.city || ""}
          placeholder="City"
          onChange={handleChange}
          className="border p-2 rounded outline-none w-full"
        />
        <input
          name="address.state"
          value={user.address?.state || ""}
          placeholder="State"
          onChange={handleChange}
          className="border p-2 rounded outline-none w-full"
        />
        <input
          name="address.pincode"
          value={user.address?.pincode || ""}
          placeholder="Pincode"
          onChange={handleChange}
          className="border p-2 rounded outline-none w-full"
        />

        <div className="flex gap-3 mt-3">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 cursor-pointer   rounded hover:bg-blue-400 flex-1"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="bg-gray-300 text-black p-2 cursor-pointer rounded hover:bg-gray-400 flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
