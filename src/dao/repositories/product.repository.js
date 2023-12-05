import ProductDTO from "../dto/product.dto.js";

export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addProduct = async (product) => {
    const newProduct = new ProductDTO(product);
    return await this.dao.add(newProduct);
  };
  getProducts = async () => {
    return await this.dao.get();
  };
  getProductById = async (id) => {
    return await this.dao.getById(id);
  };
  deleteProductById = async (id) => {
    return await this.dao.deleteById(id);
  };
  updateProductById = async (id, product) => {
    const newProduct = new ProductDTO(product);
    return await this.dao.updateById(id, newProduct);
  };
  getProductsWithParams = async (limit, page, query, sort) => {
    return await this.dao.getWithParams(limit, page, query, sort);
  };
}
