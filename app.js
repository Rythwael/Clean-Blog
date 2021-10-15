const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ejs = require("ejs");
const path = require("path");
const app = express();
const Post = require("./models/Posts");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost/blog-test-db');

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts
  });
});
app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post",{
    post
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/posts", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
