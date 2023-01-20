const express = require("express");
const { getAllPosts, createPost } = require("../controllers/postControllers");

const app = express.Router();

//import requireAuth to protect the Posts
const requireAuth = require("../middlewares/requireAuth");

app.use(requireAuth);

app.route("/").get(getAllPosts).post(createPost);

module.exports = app;
