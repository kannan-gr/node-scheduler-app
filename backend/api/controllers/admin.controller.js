const bcrypt = require("bcrypt");
const adminModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await adminModel.create({
      username,
      password: hashedPassword,
    });
    return res.status(200).json(newAdmin);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await adminModel.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addAdmin,
  loginAdmin,
};
