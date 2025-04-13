const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signupUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    const token = generateToken(newUser._id);
    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(existingUser._id);
    res.status(200).json({ token, user: { id: existingUser._id, username: existingUser.username } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser, signupUser };
