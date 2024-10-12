import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users
    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve users", error: error.message });
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists!! Login Instead" });
    }
    //now hash the password
    const hashPassword = await bcrypt.hash(password, 10); //hash and make it 10 length long
    let newUser = new User({
      name,
      email,
      password: hashPassword,
      blogs:[]
    });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials,Email is not registered!!",
        error: error.message,
      });
    }
    //compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is wrong" });
    }
    //generate a jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong :(", error: error.message });
  }
};
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, password } = req.body;
//     let user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     //update only when user is found
//     user.name = name || user.name;
//     user.email = email || user.email;
//     if (password) {
//       user.password = await bcrypt.hash(password, 10);
//     }

//     //save the updated user
//     await user.save();
//     return res.status(200).json({ message: "Updated User Details", user });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error updating user", error: error.message });
//   }
// };
export default { getAllUser, signUp, login };
