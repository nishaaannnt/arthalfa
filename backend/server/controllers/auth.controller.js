const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

// Login function
const login = async (req, res, next) => {
  try {
    
    res.status(200).json({ user, token });
  } catch (err) {
    next(err); 
  }
};

// Signup function
const signup = async (req, res, next) => {
  try {
    

    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (err) {
    next(err); 
  }
};

module.exports = { login, signup };
