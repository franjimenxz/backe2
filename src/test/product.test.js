import chai from "chai";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Product from "../dao/mongo/classes/product.dao.js";
import ProductDTO from "../dao/dto/product.dto.js";
import config from "../config/config.js";
const expect = chai.expect;

const db = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB}`;
await mongoose.connect(db);

describe("Product", () => {
  before(function () {
    this.productDao = new Product();
  });
  beforeEach(async function () {
    this.timeout(5000);
    this.mockProduct = new ProductDTO({ code: faker.string.uuid() });
    mongoose.connection.collections.products.drop();
  });

  it("Deberia poder crearse un producto", async function () {
    let response = await this.productDao.add(this.mockProduct);
    expect(response).to.have.property("_id");
  });
  it("Debería poder obtenerse todos los productos", async function () {
    await this.productDao.add(this.mockProduct);
    let response = await this.productDao.get();
    expect(response).to.be.an("array");
  });
  it("Debería poder obtener un producto por id", async function () {
    let { _id } = await this.productDao.add(this.mockProduct);
    let product = await this.productDao.getById(_id);
    expect(product).to.have.property("_id");
  });
  it("Deberia poder actualizarse un producto", async function () {
    let { _id } = await this.productDao.add(this.mockProduct);

    let product = await this.productDao.updateById(
      _id,
      new ProductDTO({ title: "test" }),
    );
    expect(product).to.property("acknowledged").to.be.true;
  });
  it("Debería poder eliminarse un producto", async function () {
    let { _id } = await this.productDao.add(this.mockProduct);

    let product = await this.productDao.deleteById(_id);
    expect(product).to.property("acknowledged").to.be.true;
  });
});
