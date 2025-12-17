// const express = require("express");
// const { registerUser, loginUser } = require("../controllers/authController");
// const User = require("../models/User");
// const authMiddleware = require("../middleware/auth");

// const router = express.Router();

// router.post("/register", registerUser);

// router.post("/login", loginUser);

// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json({ message: "Server error" });
//   }
// });

// router.get("/profile", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");
//     // const user = await User.findById(req.userId).select("-password");
//     res.status(200).json(user);
//   } catch (error) {

//     res.status(500).json({ message: "Server Error" });
//   }
// });

// //  update profile

// router.put("/profile", authMiddleware, async (req, res) => {
//   try {
//     const { mobile, dob, profileImage, address } = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.userId,
//       { mobile, dob, profileImage, address },
//       { new: true }
//     ).select("-password");
//     res
//       .status(200)
//       .json({ message: "Profile Updated successfully", user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const multer = require("multer"); // <-- Added for file uploads
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const fs = require("fs");
const router = express.Router();

// --- Multer setup for file upload ---
const upload = multer({ storage: multer.memoryStorage() }); // <-- Added

// --- Public Routes ---
router.post("/register", registerUser);
router.post("/login", loginUser);

// --- Get profile of logged-in user ---
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// for Image

router.get("/profile/image", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.profileImage) {
      return res.status(404).send("No image found");
    }

    res.sendFile(user.profileImage, { root: "." }); // send file from uploads folder
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// router.put(
//   "/profile",
//   authMiddleware,
//   upload.single("profileImage"),
//   async (req, res) => {
//     try {
//       const { name, mobile, dob, address } = req.body;

//       // Parse address if sent as string

//       const updatedData = {
//         name,
//         mobile,
//         dob,
//       };
//       if (address) {
//         updatedData.address =
//           typeof address === "string" ? JSON.parse(address) : address;
//       }

//       // Handle uploaded image
//       if (req.file) {
//         const uploadsDir = "./uploads";
//         if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

//         const filename = `profile-${req.userId}.png`;
//         const filepath = `${uploadsDir}/${filename}`;
//         fs.writeFileSync(filepath, req.file.buffer);

//         // Update only this line:
//         updatedData.profileImage = `/uploads/${filename}`; // <-- store relative URL for frontend
//       }

//       const updatedUser = await User.findByIdAndUpdate(
//         req.userId,
//         updatedData,
//         { new: true }
//       ).select("-password");

//       res
//         .status(200)
//         .json({ message: "Profile Updated successfully", user: updatedUser });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   }
// );

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"), // handle file upload
  async (req, res) => {
    try {
      const { name, mobile, dob, address } = req.body;

      const updatedData = {
        name,
        mobile,
        dob,
      };

      // Parse address if sent as JSON string
      if (address) {
        updatedData.address =
          typeof address === "string" ? JSON.parse(address) : address;
      }

      // Handle uploaded image
      if (req.file) {
        const uploadsDir = "./uploads";
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

        const filename = `profile-${req.userId}.png`;
        const filepath = `${uploadsDir}/${filename}`;
        fs.writeFileSync(filepath, req.file.buffer);

        // Store relative path for frontend usage
        updatedData.profileImage = `/uploads/${filename}`;
      }

      // Update user in DB
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        updatedData,
        { new: true }
      ).select("-password");

      res
        .status(200)
        .json({ message: "Profile Updated successfully", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// --- Auth middleware ---
// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, "secretKey"); // <-- Fixed typo from "secretekey"
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// --- Get all users (for testing/admin) ---
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({}).select("-password");
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// --- Update profile (with optional image upload) ---
// router.put(
//   "/profile",
//   authMiddleware,
//   upload.single("profileImage"), // <-- Added to handle file upload
//   async (req, res) => {
//     try {
//       const { name, mobile, dob, address } = req.body;

//       // --- Handle uploaded profile image ---
//       let profileImage;
//       if (req.file) { // <-- Changed: use req.file instead of req.body.profileImage
//         profileImage = req.file.buffer; // store buffer (or upload to cloud)
//       }

//       const updatedData = {
//         name,
//         mobile,
//         dob,
//       };

//       // --- Parse address if sent as JSON string ---
//       if (address) {
//         updatedData.address =
//           typeof address === "string" ? JSON.parse(address) : address; // <-- Changed
//       }

//       if (profileImage) updatedData.profileImage = profileImage;

//       const updatedUser = await User.findByIdAndUpdate(req.userId, updatedData, {
//         new: true,
//       }).select("-password");

//       res.status(200).json({
//         message: "Profile updated successfully",
//         user: updatedUser,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   }
// );

module.exports = router;
