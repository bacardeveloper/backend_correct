const express = require("express");
const { login_userController } = require("../logic/log/login_function");
const { create_userController } = require("../logic/log/signup_function");

// config modules
let routes_user = express.Router();
routes_user.post("/signup", create_userController);
routes_user.post("/login", login_userController);

module.exports = routes_user;