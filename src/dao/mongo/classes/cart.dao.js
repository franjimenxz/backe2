import { cartModel } from "../models/cart.model.js";

class Cart {
  add = async (cart) => {
    try {
      return await cartModel.create({ products: cart.products || [] });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  get = async () => {
    try {
      let result = await cartModel.find();
      if (result.length === 0) {
        result = null;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getById = async (id) => {
    try {
      let result = await cartModel.findOne({ _id: id });
      if (!result) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  async addToCart(idCart, idProd, quantity) {
    try {
      let exist = await cartModel.findOne({
        _id: idCart,
        products: { $elemMatch: { product: idProd } },
      });
      if (exist) {
        return await this.updateFromCart(idCart, idProd, quantity);
      } else {
        return await cartModel.updateOne(
          {
            _id: idCart,
          },
          { $push: { products: { product: idProd, quantity: 1 } } },
        );
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  empty = async (id) => {
    try {
      return await cartModel.updateOne({ _id: id }, { $set: { cart: [] } });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  deleteFromCart = async (idCart, idProd) => {
    try {
      return await cartModel.deleteOne({
        _id: idCart,
        products: { $elemMatch: { _id: idProd } },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  update = async (id, cart) => {
    try {
      let exist = await cartModel.find({ _id: id });
      if (exist.length === 0) {
        return null;
      } else {
        return await cartModel.updateOne({ _id: id }, cart);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateFromCart = async (idCart, idProd, quantity) => {
    try {
      return await cartModel.updateOne(
        {
          _id: idCart,
          products: { $elemMatch: { product: idProd } },
        },
        { $inc: { "products.$.quantity": quantity } },
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
export default Cart;
