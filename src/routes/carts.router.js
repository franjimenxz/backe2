import { Router } from "express";
import {
  addCart,
  addProductToCart,
  deleteProductFromCart,
  emptyCart,
  getCartById,
  getCarts,
  purchaseCart,
  updateCart,
  updateProductFromCart,
} from "../controllers/cart.controller.js";
import { isUser } from "../middlewares/authorization.js";
import { upCart } from "../middlewares/upCart.middleware.js";
import { passportCall } from "../util/authUtil.js";

/*
 * Manejo de las rutas de la API de carritos
 * */
const router = Router();
// Pide todos los carritos a la base de datos
router.get("/", getCarts);

// Pide un carrito por id a la base de datos
router.get("/:cid", getCartById);

// Crea un carrito en la base de datos
router.post("/", passportCall("jwt"), addCart);

// Agrega un producto al carrito
router.post("/:cid/products/:pid", addProductToCart);

// Elimina un producto del carrito
router.delete("/:cid/products/:pid", deleteProductFromCart);

// Actualiza un carrito por id de la base de datos
router.put("/:cid", isUser, updateCart);
// Actualiza un producto del carrito por id de la base de datos
router.put("/:cid/products/:pid", isUser, updateProductFromCart);

// Elimina un carrito por id de la base de datos
router.delete("/:cid", emptyCart);

router.post("/:cid/purchase", upCart, purchaseCart);
export default router;
