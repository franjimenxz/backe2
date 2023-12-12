import chai from "chai";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import Cart from "../dao/mongo/classes/cart.dao.js";
import Product from "../dao/mongo/classes/product.dao.js";
import ProductDTO from "../dao/dto/product.dto.js";
import config from "../config/config.js";
const db = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB}`;
await mongoose.connect(db);

const expect = chai.expect;

describe("Cart", () => {
    before(function(){
        this.cartDao = new Cart();
        this.productDao = new Product();
        this.mockProduct = new ProductDTO({code:faker.string.uuid()});
    
    })
    beforeEach(async function() {
        this.timeout(5000);
    });

    it("El carrito deberia poder crearse", async function() {
        let response = await this.cartDao.add([]);
        expect(response).to.have.property("_id");
    });
    it("Los carritos deberian poder obtenerse", async function() {
        let response = await this.cartDao.get();
        expect(response).to.be.an("array");
    });
    it("El carrito deberia poder obtenerse por id", async function() {
        let response = await this.cartDao.get();
        let id = response[0]._doc._id;
        let cart = await this.cartDao.getById(id);
        expect(cart).to.have.property("_id");
    });
    // it("El carrito deberia poder actualizarse", async function() {
    //     let product = await this.productDao.get()[0];
    //     let response = await this.cartDao.get();
    //     let id = response[0]._doc._id;
    //     let cart = await this.cartDao.update(id,[{product:product._id,quantity:1}]);
    //     expect(cart).to.have.property("acknowledged").to.be.true;
    // });
    // it("Se podra agregar un producto al carrito", async function() {
    //     let response = await this.cartDao.get();
    //     let id = response[0]._doc._id;
    //     let cart = await this.cartDao.addToCart(id,this.mockProduct.code,1);
    //     expect(cart).to.have.property("acknowledged").to.be.true;
    // });
    it("Se podra eliminar un producto del carrito", async function() {
        let response = await this.cartDao.get();
        let id = response[0]._doc._id;
        let cart = await this.cartDao.dFromCart(id,this.mockProduct.code);
        expect(cart).to.have.property("acknowledged").to.be.true;
    })
    // it("El carrito deberia poder vaciarse", async function() {
    //     let response = await this.cartDao.get();
    //     let id = response[0]._doc._id;
    //     let cart = await this.cartDao.empty(id);
    //     expect(cart).to.have.property("acknowledged").to.be.true;
    // });

})