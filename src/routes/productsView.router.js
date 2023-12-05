import { Router } from "express";

/*
 * Manejo de las rutas de la API de views de productos
 */

import ProductDao from "../dao/mongo/classes/product.dao.js";
import { auth } from "../util/authUtil.js";
import { productService } from "../dao/repositories/index.js";
const router = Router();

// Pide todos los productos a la base de datos
router.get("/", auth, async (req, res) => {
  try {
    const response = await productService.getProducts();
    let products;
    if (response.length === 0) {
      products = [];
    } else {
      products = response.map((product) => {
        return {
          ...product._doc,
          prevLink: product._doc.prevLink
            ? product._doc.prevLink.replace(
                "http://localhost:8080/api",
                "http://localhost:8080",
              )
            : product._doc.prevLink,
          nextLink: product._doc.nextLink
            ? product._doc.nextLink.replace(
                "http://localhost:8080/api",
                "http://localhost:8080",
              )
            : product._doc.nextLink,
        };
      });
    }
    res.render("products", {
      user: req.user,
      rol: req.user.role === "admin",
      products: products,
      title: "Productos",
      style: "styles.css",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
