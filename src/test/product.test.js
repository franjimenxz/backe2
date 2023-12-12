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
    before(function(){
        this.productDao = new Product();
        this.mockProduct = new ProductDTO({code:faker.string.uuid()});
    })
    beforeEach(async function() {
        this.timeout(5000);
    });

    it("El DAO debería poder crear un producto", async function() {
        let response = await this.productDao.add(this.mockProduct);
        expect(response).to.have.property("_id");
    }
    );
    it("El DAO debería poder obtener todos los productos", async function() {
        let response = await this.productDao.get();
        expect(response).to.be.an("array");
    }
    );
    it("El DAO debería poder obtener un producto por id",async function() {
        let response = await this.productDao.get();
        let id = response[0]._doc._id;
        let product = await this.productDao.getById(id);
        expect(product).to.have.property("_id");
    }
    );
    it("El DAO debería poder actualizar un producto", async function() {
        let response = await this.productDao.get();
        let id = response[0]._doc._id;
        let product = await this.productDao.updateById(id,new ProductDTO({title:"test"}));
        expect(product).to.property("acknowledged").to.be.true;
    }
    );
    it("El DAO debería poder eliminar un producto", async function() {
        let response = await this.productDao.get();
        let id = response[0]._doc._id;
        let product = await this.productDao.deleteById(id);
        expect(product).to.property("acknowledged").to.be.true;
    }
    );
})