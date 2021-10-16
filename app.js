const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require('method-override');
const app = express();
const pageController = require('./controllers/pageController');
const postController = require('./controllers/postController');


app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

mongoose.connect('mongodb://localhost/blog-test-db');

app.get("/posts/edit/:id", pageController.getEditPage);
app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);

app.get("/", postController.getAllPosts);
app.get("/posts/:id", postController.getPost);
app.post("/posts", postController.createPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/posts/:id", postController.deletePost);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
