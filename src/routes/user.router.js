import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  uploadFiles,
} from "../controllers/user.controller.js";
import { transport } from "../config/mail.config.js";
import multer from "multer";
import { storage } from "../config/multer.config.js";

const router = Router();

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  res.send("Hola mundo");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/:uid/doc", upload.array("files", 5), uploadFiles);
export default router;
