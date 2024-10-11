import User from "../model/User.js";
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
    let existingUser = await User.find({ email });
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
    return res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {}
};

export default { getAllUser, signUp };
