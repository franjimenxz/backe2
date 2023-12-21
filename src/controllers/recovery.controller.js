import { transport } from "../config/mail.config.js";
import { userService } from "../dao/repositories/index.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { createHash } from "../util/cryptoUtil.js";

const emailRegex = /\S+@\S+\.\S+/;
export const sendEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!emailRegex.test(email))
      return res
        .status(400)
        .send({ status: "error", message: "Email is not valid!" });

    const aux = await userService.getUser(email);

    if (!aux) throw new Error("User not found!");

    const user = {
      first_name: aux.first_name,
      last_name: aux.last_name,
      email: aux.email,
      age: aux.age,
    };

    const token = jwt.sign(user, config.JWT_SECRET, { expiresIn: "1h" });

    const link = `http://localhost:3000/change-password/${token}`;

    const result = await transport.sendMail({
      from: `Juan Confalonieri <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recovery Password",
      html: `<div>
                        <h1>Recovery Password</h1>
                        <p>Hi ${user.first_name} ${user.last_name},</p>
                        <p>Click on the link below to change your password:</p>
                        <a href="${link}">Change Password</a>
                    </div>`,
    });

    res.send({ status: "ok", message: "Email sent!" });
  } catch (error) {
    console.log(error.message);
    res.send({ status: "error", message: "Error in send email!" });
  }
};

export const changePassword = async (req, res) => {
  const result = jwt.verify(req.body.token, config.JWT_SECRET);

  if (!result) return res.status(401).send("Access denied!");
  if (req.body.password !== req.body.retypePassword)
    return res.status(400).send("Passwords don't match!");
  await userService.updateUser(result.email, {
    password: createHash(req.body.password),
  });

  res.send("Contraseña cambiada!");
};

export const tokenValidation = (req, res, next) => {
  const token = req.params.token;

  if (!token) return res.status(401).send("Access denied!");

  try {
    const payload = jwt.verify(token, process.env.SECRET);
    if (!payload) return res.redirect("/forgot-password");
    req.user = payload;
    res.redirect(`/change-password/${token}`);
  } catch (error) {
    res.status(400).send("Invalid token!");
  }
};
