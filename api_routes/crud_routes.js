const express = require("express");
const { getDashBoard } = require("../logic/crud/get_dashboard");
const authUser = require("../middleware/auth_user");

let routes_crud = express.Router();
routes_crud.get("/dashboard/:token", authUser, getDashBoard);

module.exports = routes_crud;
