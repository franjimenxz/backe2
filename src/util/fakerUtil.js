import { faker } from "@faker-js/faker";
import { productService } from "../dao/repositories/index.js";
import ProductDTO from "../dao/dto/product.dto.js";

export const generateProducts = async () => {
  for (let i = 0; i < 1000; i++) {
    await productService.addProduct(
      new ProductDTO({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.internet.password(),
        stock: faker.number.int({ min: 0, max: 100 }),
        status: faker.datatype.boolean(),
        category: faker.commerce.department(),
      }),
    );
  }
};
