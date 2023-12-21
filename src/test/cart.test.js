import chai from "chai";
import { faker, tr } from "@faker-js/faker";
import mongoose from "mongoose";
import Cart from "../dao/mongo/classes/cart.dao.js";
import Product from "../dao/mongo/classes/product.dao.js";
import ProductDTO from "../dao/dto/product.dto.js";
import config from "../config/config.js";
const db = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB}`;
await mongoose.connect(db);

const expect = chai.expect;

describe("Cart", () => {
  before(function () {
    this.cartDao = new Cart();
    this.productDao = new Product();
  });
  beforeEach(async function () {
    this.timeout(5000);
    mongoose.connection.collections.carts.drop();
    this.mockProduct = new ProductDTO({ code: faker.string.uuid() });
  });

  it("Deberia poder agregarse un carrito", async function () {
    try {
      let response = await this.cartDao.add([]);
      expect(response).to.have.property("_id");
    } catch (error) {
      console.log(error);
    }
  });
  it("Deberian poder obtenerse los carritos", async function () {
    try {
      await this.cartDao.add([]);
      let response = await this.cartDao.get();
      expect(response).to.be.an("array");
    } catch (error) {
      console.log(error);
    }
  });
  it("Deberian poder obtenerse un carrito por id", async function () {
    try {
      let { _id } = await this.cartDao.add([]);
      let cart = await this.cartDao.getById(_id);
      expect(cart).to.have.property("_id");
    } catch (error) {
      console.log(error);
    }
  });
  it("Deberia poder actualizarse un carrito por id", async function () {
    try {
      let { _id } = await this.cartDao.add([]);
      let prod = await this.productDao.add(this.mockProduct);
      let cart = await this.cartDao.update(_id, {
        products: [{ product: prod._id, quantity: 1 }],
      });
      expect(cart).to.have.property("acknowledged").to.be.true;
    } catch (error) {
      console.log(error);
    }
  });
  it("Deberia poder agregarse un producto al carrito", async function () {
    try {
      let { _id } = await this.cartDao.add([]);
      let product = await this.productDao.add(this.mockProduct);
      let cart = await this.cartDao.addToCart(_id, product._id, 1);
      expect(cart).to.have.property("acknowledged").to.be.true;
    } catch (error) {
      console.log(error);
    }
  });
  it("Deberia poder eliminarse un producto del carrito", async function () {
    try {
      let { _id } = await this.cartDao.add([]);
      let product = await this.productDao.add(this.mockProduct);
      await this.cartDao.addToCart(_id, product._id, 1);
      let cart = await this.cartDao.deleteFromCart(_id, product._id);
      expect(cart).to.have.property("acknowledged").to.be.true;
    } catch (error) {
      console.log(error);
    }
  });
  it("Deberia poder vaciarse el carrito", async function () {
    try {
      let { _id } = await this.cartDao.add([]);
      let product = await this.productDao.add(this.mockProduct);
      await this.cartDao.addToCart(_id, product._id, 1);
      let cart = await this.cartDao.empty(_id);
      expect(cart).to.have.property("acknowledged").to.be.false;
    }catch (error) {
      console.log(error);
    }
  });
});
