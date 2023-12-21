import mongoose from "mongoose";
import { createHash } from "../../../util/cryptoUtil.js";

const userCollection = "users";

// Schema de los documentos
const itemDocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
});

// Schema de los usuarios
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin", "premium"],
  },
  documents: {
    type: [itemDocumentSchema],
    required: true,
  },
  last_connection: { type: Date, required: true, default: Date.now },
});

// Populates del carrito del usuario
userSchema.pre("save", function () {
  this.password = createHash(this.password);
});

userSchema.pre("findOne", function () {
  this.populate("cart");
});
export const userModel = mongoose.model(userCollection, userSchema);
