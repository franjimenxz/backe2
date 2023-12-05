import mongoose from "mongoose";
import { cartService } from "../dao/repositories/index.js";

export const upCart = async (req, res, next) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await cartService.getCartById(cid);
      req.cart = response.toObject();
      next();
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
  }
};
