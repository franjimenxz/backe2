import { Router } from "express";
import jwt from "jsonwebtoken";
import { auth } from "../util/authUtil.js";

const router = Router();

router.get("/login", async (req, res) => {
  if (req.user) {
    return res.redirect("/products");
  }
  res.render("login", {
    title: "Login",
    style: "styles.css",
    requiredLogin: req.query.requiredLogin === "true" ?? false,
    failedLogin: req.query.failedLogin === "true" ?? false,
  });
});

router.get("/register", async (req, res) => {
  if (req.user) {
    return res.redirect("/products");
  }
  res.render("register", {
    title: "Register",
    style: "index.css",
  });
});

export default router;
