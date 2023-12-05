import { Router } from "express";
import { cartService } from "../dao/repositories/index.js";

/*
 * Manejo de las rutas de la API de views de carritos
 * */

const router = Router();

// Pide todos los carritos a la base de datos
router.get("/:cid", async (req, res) => {
  let cid = req.params.cid;
  try {
    let response = await cartService.getCartById(cid);
    res.render("carts", {
      style: "styles.css",
      title: "Carrito",
      products: response.toObject().products,
      total: response.toObject().products.reduce((acc, curr) => {
        return acc + curr.product.price * curr.quantity;
      }, 0),
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
