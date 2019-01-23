const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

router.get("/", (req, res) => {
  Blog.find()
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(e => res.status(500).send("bad"));
});

router.get("/featured", (req, res) => {
  Blog.where({ blogs: "featured" })
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(e => res.status(500).send("bad"));
});

router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(blogs => {
      if (!blogs) res.status(404).send(null);
      res.status(200).json(blogs);
    })
    .catch(e => res.status(500).send("bad"));
});

router.post("/", (req, res) => {
  // New higher scope variable
  let dbUser;
  // Create a blog
  const newBlog = new Blog(req.body);
  
  // Fetch the user from the database
  User.findById(req.body.authorId)
    .then(user => {
      // Store the fetched user in higher scope variable
      dbUser = user;

      // Bind the user to it
      newBlog.author = user._id;

      // Save it to the database
      return newBlog.save();
    })
    .then(blog => {
      // Push the saved blog to the array of blogs associated with the User
      dbUser.blogs.push(blog);

      // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
      dbUser.save().then(() => res.status(201).json(blog));
    });
});

// .then(blog => {
//   console.log("Saved blog is", blog);

//   theUser.blogs.push(blog);
//   theUser
//       .save()
//       .then(() => res.status(201).send(blog))
// });




router.put("/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(blogs => {
      res.status(204).json(blogs);
    })
    .catch(e => res.status(500).send("Not working"));
});

router.delete("/:id", (req, res) => {
  console.log(2);
  let id = req.params.id;
  Blog.findByIdAndRemove(id)
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(console.error);
});

module.exports = router;

console.log();
