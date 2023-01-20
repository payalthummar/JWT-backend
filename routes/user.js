const express = require("express");

const { signUpUser, loginUser } = require("../controllers/userControllers");
const app = express.Router();

//login User Routes
app.post("/login", loginUser);

//sign up Routes
app.post("/signup", signUpUser);

module.exports = app;
