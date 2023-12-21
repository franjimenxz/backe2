import mongoose from "mongoose";
import {
  cartService,
  productService,
  ticketService,
  userService,
} from "../dao/repositories/index.js";
import CustomError from "../errors/CustomError.js";
import ErrorCodes from "../errors/enums.js";
import {
  generateCartIdErrorInfo,
  generateCartNotFoundErrorInfo,
} from "../errors/info.js";

export const getCarts = async (req, res) => {
  try {
    let carts = await cartService.getCarts();
    res.status(200).send({
      status: "success",
      payload: carts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
  res.send("carrito");
};

export const getCartById = async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let cart = await cartService.getCartById(cid);
      if (!cart) {
        CustomError.createError({
          name: "Cart not found",
          cause: generateCartNotFoundErrorInfo(cid),
          message: "Error to get cart by ID",
          code: ErrorCodes.NOT_FOUND_ERROR,
        });
      }
      res.status(200).send({
        status: "success",
        payload: cart,
      });
    } else {
      CustomError.createError({
        name: "Invalid Params",
        cause: generateCartIdErrorInfo(req.params.cid),
        message: "Error to get cart by ID",
        code: ErrorCodes.INVALID_PARAM,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
};

export const addCart = async (req, res) => {
  try {
    let response = await cartService.addCart(req.body);
    await userService.addCartToUser(req.user.email, response.toObject()._id);
    res.status(200).send({
      status: "success",
      payload: response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    if (
      mongoose.Types.ObjectId.isValid(pid) &&
      mongoose.Types.ObjectId.isValid(cid)
    ) {
      let user = await userService.getUser(req.user.email);
      let product = await productService.getProductById(pid);
      if (user.email === product.owner) {
        CustomError.createError({
          name: "Unauthorized",
          message: "Unauthorized",
          code: ErrorCodes.UNAUTHORIZED,
        });
      }
      let response = await cartService.addProductToCart(
        cid,
        pid,
        req.body.quantity,
      );
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      CustomError.createError({
        name: "Invalid Params",
        cause: generateProductCartIdErrorInfo(cid, pid),
        message: "Error to add product to cart",
        code: ErrorCodes.INVALID_PARAM,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await cartService.deleteProductFromCart(cid, pid);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      CustomError.createError({
        name: "Invalid Params",
        cause: generateCartIdErrorInfo(req.params.cid),
        message: "Error to delete product from cart",
        code: ErrorCodes.INVALID_PARAM,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await cartService.updateCart(cid, req.body);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      CustomError.createError({
        name: "Invalid Params",
        cause: generateCartIdErrorInfo(req.params.cid),
        message: "Error to update cart",
        code: ErrorCodes.INVALID_PARAM,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProductFromCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await cartService.updateProductFromCart(
        cid,
        pid,
        req.body,
      );
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
  }
};

export const emptyCart = async (req, res) => {
  try {
    let cid = req.params.cid;
    if (mongoose.Types.ObjectId.isValid(cid)) {
      let response = await cartService.emptyCart(cid);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      throw new Error("Id invalido");
    }
  } catch (error) {
    console.log(error);
  }
};

export const purchaseCart = async (req, res) => {
  try {
    let cart = req.cart;
    let cartInStock = cart;
    cart.products.forEach((element) => {
      if (element.product.stock < element.quantity) {
        req.logger.warning(
          `No hay stock del producto ${element.product.title}`,
        );
        cartInStock.products.filter((product) => product._id !== element._id);
      } else {
        productService.updateProductById(element._id, {
          ...element,
          stock: element.product.stock - element.quantity,
        });
        cartService.deleteProductFromCart(cart._id, element._id);
      }
    });
    await ticketService.addTicket(cartInStock, req.user.email);
  } catch (error) {
    console.log(error);
  }
};
