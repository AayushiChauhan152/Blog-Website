import express from "express";
import user from "../models/user.js";
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin.ejs");
});

router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await user.matchPasswordandGenerateToken(email, password);
    res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("signin.ejs", { err: "incorrect email or password" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  await user.create({
    name,
    email,
    password,
  });
  console.log(name);
  res.redirect("/");
});

export default router;
