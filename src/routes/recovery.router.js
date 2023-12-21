import { Router } from "express";
import { transport } from "../config/mail.config.js";
import {
  changePassword,
  sendEmail,
  tokenValidation,
} from "../controllers/recovery.controller.js";

const router = Router();

router.get("/send/email", sendEmail);
router.get("/tokenValidation/:token", tokenValidation);
router.post("/change-password", changePassword);

export default router;
