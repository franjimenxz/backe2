import { productModel } from "../models/product.model.js";
/*
 * Manejo de la base de datos de productos
 * */
class Product {
  add = async (product) => {
    try {
      let exist = await productModel.find({ code: product.code });
      if (exist.length > 0) {
        return null;
      }
      return await productModel.create(product);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Pide todos los productos a la base de datos
  get = async () => {
    try {
      const result = await productModel.find();
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Pide un producto por id a la base de datos
  getById = async (id) => {
    try {
      let result = await productModel.findById({ _id: id });
      if (!result) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Elimina un producto por id de la base de datos
  deleteById = async (id) => {
    try {
      let result = await productModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Actualiza un producto por id de la base de datos
  updateById = async (id, product) => {
    try {
      let exist = await productModel.find({ _id: id });
      if (exist.length === 0) {
        return null;
      } else {
        return await productModel.updateOne(
          { _id: id },
          {
            $set: {
              title: product.title,
              description: product.description,
              price: product.price,
              thumbnail: product.thumbnail,
              code: product.code,
              stock: product.stock,
              category: product.category,
            },
          },
        );
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Pide los productos con filtros a la base de datos
  getWithParams = async (limit, page, filter, sort) => {
    try {
      if (!sort) {
        return await productModel.paginate(filter, {
          limit: limit,
          page: page,
        });
      } else {
        if (sort !== "asc" && sort !== "desc") {
          return null;
        }
        return await productModel.paginate(filter, {
          limit: limit,
          page: page,
          sort: { price: sort },
        });
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
export default Product;
