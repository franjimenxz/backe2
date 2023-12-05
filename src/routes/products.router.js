import { Router } from "express";
import { passportCall } from "../util/authUtil.js";
import {
  addProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/authorization.js";

/*
 * Manejo de las rutas de la API de productos
 */

const router = Router();

// Pide todos los productos a la base de datos
router.get("/", passportCall("jwt"), getProducts);

// Pide un producto por id a la base de datos
router.get("/:pid", getProductById);

// Crea un producto en la base de datos
router.post("/", addProduct);

// Actualiza un producto por id en la base de datos
router.put("/:pid", isAdmin, updateProductById);

// Elimina un producto por id en la base de datos
router.delete("/:pid", isAdmin, deleteProductById);
export default router;
