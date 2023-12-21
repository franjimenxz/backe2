export default class ProductDTO {
  constructor(product) {
    this.title = product.name || "Sin titulo";
    this.description = product.description || "Sin descripcion";
    this.price = product.price || 0;
    this.thumbnail = product.thumbnail || "Sin imagen";
    this.code = product.code || "Sin codigo";
    this.status = product.status || true;
    this.stock = product.stock || 0;
    this.category = product.category || "Sin categoria";
    this.owner = product.owner || "admin";
  }
}
