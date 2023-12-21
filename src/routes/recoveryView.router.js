import { Router } from "express";

const router = Router();

router.get("/forgot-password", async (req, res) => {
  if (req.user) {
    return res.redirect("/products");
  }
  res.render("forgot_password", {
    title: "Forgot Password",
    style: "index.css",
  });
});

router.get("/change-password/:token", async (req, res) => {
  if (req.user) {
    return res.redirect("/products");
  }
  res.render("change_password", {
    title: "Change Password",
    style: "index.css",
    token: req.params.token,
  });
});

export default router;
