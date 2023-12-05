import mongoose, { Schema } from "mongoose";

const cartCollection = "carts";

// Schema de los items del carrito
const itemCartSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Schema del carrito
const cartSchema = new mongoose.Schema({
  products: {
    type: [itemCartSchema],
    required: true,
  },
});

// Populate de los productos del carrito
cartSchema.pre("findOne", function () {
  this.populate("products.product");
});
export const cartModel = mongoose.model(cartCollection, cartSchema);
