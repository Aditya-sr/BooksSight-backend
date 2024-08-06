const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const { generateToken } = require("../service/authServices");
const db = require("../model");
const Registration = db.Registration;

const registerUser = async (req, res) => {
  const { email, username, password, role } = req.body;
  console.log("Request body", req.body);

  try {
    const existingUser = await Registration.findOne({ where: { email } });
    if (existingUser) {
      console.log("Email already exists"); // Log specific error

      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Registration.create({
      email,
      username,
      role,
      password: hashedPassword,
    });
    console.log("User created successfully:", newUser); // Log successful creation

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Internal server error:", error); // Log internal server error

    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};




const getAllUser = async (req, res) => {
  try {
    const users = await Registration.findAll();
    res.status(200).json({ users });
    console.log(users);
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.uid;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    const user = await Registration.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.userRole = user.role;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};


const authorizationMiddleware = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.userRole)) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};

const getCurrentUser = async (req, res) => {
  console.log("Requetsd to me")
  try {
    const user = await Registration.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ role: user.role }); // Return only role
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const editUser = async (req, res) => {
  const { id } = req.params; // Extract id from params
  const { username, email, password, role } = req.body;
  try {
    const user = await Registration.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
    await user.update({ username, email, password: hashedPassword, role });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; // Extract id from params
  try {
    const user = await Registration.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Registration.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send({
        error: "User doesn't exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        error: "Invalid email or password",
      });
    }
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

  
    const token = generateToken(userData);
    res.cookie("uid", token, { httpOnly: true, secure: false, sameSite: 'lax' }); // Adjust options as needed

    res.status(200).send({ msg: "token created", token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  login,
  registerUser,
  getAllUser,
  editUser,
  deleteUser,
  authMiddleware,
  authorizationMiddleware,
  getCurrentUser
  
};
