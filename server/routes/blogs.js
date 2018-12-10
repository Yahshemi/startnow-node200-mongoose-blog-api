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

// router.post('/', (req, res) => {
//   let theUser = null;
//   let newBlog = new Blog(req.body);

//   User
//       .findById(req.body.authorId)
//       .then(user => {
//           // console.log("--- USER FROM DB ---");
//           // console.log("user", user);

//           theUser = user;
//           newBlog.author = user._id;
//           return newBlog.save();
//       })
//       .then(blog => {
//           console.log("Saved blog is", blog);

//           theUser.blogs.push(blog);
//           theUser
//               .save()
//               .then(() => res.status(201).send(blog))
//       });
// });






// router.post("/", (req, res) => {
//   let dbUser = null;
//   let newBlog = new Blog(req.body);

//   User
//   // Fetch the user from the database.
//   .findById(req.body.authorId)
//     .then(user => {     
//   // Create a blog.
//       theUser = user;
//       newBlog.author = user._id;
//       return newBlog.save();
//     })
//     .then(blog => {
//       console.log("Saved blog is", blog);

//       theUser.blogs.push(blog);
//       theUser.save().then(() => res.status(201).send(blog));
//     });
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
