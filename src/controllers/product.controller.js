import mongoose from "mongoose";
import ProductDTO from "../dao/dto/product.dto.js";
import { productService } from "../dao/repositories/index.js";
import CustomError from "../errors/CustomError.js";
import ErrorCodes from "../errors/enums.js";
import { generateProductIdErrorInfo } from "../errors/info.js";

export const getProducts = async (req, res) => {
  try {
    let { limit, page, category, status, sort } = req.query;
    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }
    let query = category
      ? { category: category }
      : status
      ? { status: status }
      : {};

    let result = await productService.getProductsWithParams(
      limit,
      page,
      query,
      sort,
    );

    res.status(200).send({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `http://localhost:8080/api/products?limit=${limit}&page=${
            result.prevPage
          }${query.category ? `&category=${query.category}` : ""}${
            query.status ? `&status=${query.status}` : ""
          }${sort ? `&sort=${sort}` : ""}`
        : null,
      nextLink: result.hasNextPage
        ? `http://localhost:8080/api/products?limit=${limit}&page=${
            result.nextPage
          }${query.category ? `&category=${query.category}` : ""}${
            query.status ? `&status=${query.status}` : ""
          }${sort ? `&sort=${sort}` : ""}`
        : null,
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

export const getProductById = async (req, res) => {
  let pid = req.params.pid;
  try {
    if (mongoose.Types.ObjectId.isValid(pid)) {
      let producto = await productService.getProductById(pid);
      res.status(200).send({
        status: "success",
        payload: producto,
      });
    } else {
      CustomError.createError({
        name: "Invalid ID",
        cause: generateProductIdErrorInfo(pid),
        message: "Invalid ID",
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

export const addProduct = async (req, res) => {
  try {
    if (req.user.role === "user") {
      CustomError.createError({
        name: "Unauthorized",
        message: "Unauthorized",
        code: ErrorCodes.UNAUTHORIZED,
      });
    }
    req.body.owner = req.user.email;
    let response = await productService.addProduct(new ProductDTO(req.body));
    res.send({
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

export const updateProductById = async (req, res) => {
  try {
    let pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(pid)) {
      let response = await productService.updateProductById(pid, req.body);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      CustomError.createError({
        name: "Invalid ID",
        cause: generateProductIdErrorInfo(pid),
        message: "Invalid ID",
        code: ErrorCodes.INVALID_PARAM,
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
      payload: [],
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    let pid = req.params.pid;

    if (mongoose.Types.ObjectId.isValid(pid)) {
      if (req.user.role === "user") {
        CustomError.createError({
          name: "Unauthorized",
          message: "Unauthorized",
          code: ErrorCodes.UNAUTHORIZED,
        });
      }
      let product = productService.getProductById(pid);
      if (
        product.owner !== req.user.email ||
        (product.owner !== req.user.email && req.user.role !== "admin")
      ) {
        CustomError.createError({
          name: "Unauthorized",
          message: "Unauthorized",
          code: ErrorCodes.UNAUTHORIZED,
        });
      } else {
        let response = await productService.deleteProductById(pid);
        res.status(200).send({
          status: "success",
          payload: response,
        });
      }
      let response = await productService.deleteProductById(pid);
      res.status(200).send({
        status: "success",
        payload: response,
      });
    } else {
      CustomError.createError({
        name: "Invalid ID",
        cause: generateProductIdErrorInfo(pid),
        message: "Invalid ID",
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
