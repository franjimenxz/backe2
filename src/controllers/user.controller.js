import { compareHash } from "../util/cryptoUtil.js";
import jwt from "jsonwebtoken";
import { userService } from "../dao/repositories/index.js";
import { generateUserErrorInfo } from "../errors/info.js";
import CustomError from "../errors/CustomError.js";
import ErrorCodes from "../errors/enums.js";

export const registerUser = async (req, res) => {
  try {
    let { first_name, last_name, email, password, age } = req.body;
    if (!first_name || !last_name || !email || !password || !age) {
      CustomError.createError({
        name: "User creation error",
        cause: generateUserErrorInfo({
          first_name,
          last_name,
          email,
          password,
          age,
        }),
        message: "Error trying to create User",
        code: ErrorCodes.INVALID_TYPES_ERROR,
      });
    }
    const result = await userService.registerUser(req.body);
    res.status(200).send({
      status: "User created successfully",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error while creating user",
      payload: error,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userService.getUser(email);
    let user = {
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      age: result.age,
    };
    if (!result) {
      throw new Error("Login failed");
    }

    if (!compareHash(password, result.password)) {
      throw new Error("Login failed");
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .redirect("/products");
  } catch (error) {
    res.status(500).send({
      status: "Error while logging in user",
      payload: error,
    });
  }
};
