import express from "express";
import multer from "multer";
import blog from "../models/blog.js";
import user from "../models/user.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/add", (req, res) => {
  res.render("addblog.ejs", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, content } = req.body;

  const b = await blog.create({
    content,
    title,
    createdBy: req.user._id,
    coverImage: `/uploads/${req.file.filename}`,
  });

  res.redirect(`/blog/${b._id}`);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const Blog = await blog.findById(id);
  const u = await user.find({ _id: Blog.createdBy });

  res.render("blog.ejs", {
    u,
    Blog,
  });
});

router.get("/dlt/:id", async (req, res) => {
  const id = req.params.id;
  const Blog = await blog.deleteOne({ _id: id });

  res.render("home.ejs");
  console.log(Blog);
});

export default router;
