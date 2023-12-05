import { Router } from "express";
import { generateProducts } from "../util/fakerUtil.js";

const router = Router();

router.get("/mockingproducts", async (req, res) => {
  try {
    await generateProducts();
    res.status(200).json({ message: "Products generated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error generating products" });
  }
});

export default router;
