export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addCart = async (cart) => {
    return await this.dao.add(cart);
  };

  getCarts = async () => {
    return await this.dao.get();
  };
  getCartById = async (id) => {
    return await this.dao.getById(id);
  };
  addProductToCart = async (idCart, idProd, quantity) => {
    return await this.dao.addToCart(idCart, idProd, quantity);
  };
  emptyCart = async (id) => {
    return await this.dao.empty(id);
  };
  deleteProductFromCart = async (idCart, idProd) => {
    return await this.dao.deleteFromCart(idCart, idProd);
  };
  updateCart = async (id, cart) => {
    return await this.dao.update(id, cart);
  };
  updateProductFromCart = async (idCart, idProd, product) => {
    return await this.dao.updateFromCart(idCart, idProd, product);
  };
}
