// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     // checking for the existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "User already exist with this email " });
//     }

//     // Hashing Password

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // for Creating new user

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     res.status(201).json({
//       message: "Registration Successful",
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // for Login User

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Create JWT

//     const token = jwt.sign(
//       {
//         id: user._id,
//       },
//       "secretekey",
//       { expiresIn: "1d" }
//     );

//     // Successful login
//     res.status(200).json({
//       message: "Login successful",

//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       }, // Replace with JWT later if needed
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// module.exports = { registerUser, loginUser };

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- Register User ---
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // --- Optionally return JWT token on registration ---
    const token = jwt.sign({ id: newUser._id }, "secretKey", {
      expiresIn: "1d",
    }); // <-- Added token

    res.status(201).json({
      message: "Registration successful",
      token, // <-- Added
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --- Login User ---
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1d" }); // <-- Fixed typo

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
