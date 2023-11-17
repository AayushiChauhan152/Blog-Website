import "dotenv/config";
import express from "express";
import userroute from "./routes/user.js";
import Blogroute from "./routes/blog.js";
import blog from "./models/blog.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { checkForAuthentication } from "./middlewares/authentication.js";

const app = express();
const port = 3000 || process.env.PORT ;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static("public"));

app.use("/user", userroute);
app.use("/blog", Blogroute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", async (req, res) => {
  const allblogs = await blog.find({});

  res.render("home.ejs", {
    user: req.user,
    blogs: allblogs,
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
