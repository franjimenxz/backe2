import { v4 as uuidv4 } from "uuid";

export default class TicketDTO {
  constructor(cart, purchaser) {
    this.code = uuidv4();
    this.purchase_datetime = Date.now();
    this.products = cart.products;
    this.amount = this.getAmount(cart);
    this.purchaser = purchaser;
  }
  getAmount = (cart) => {
    let amount = 0;
    cart.products.forEach((product) => {
      amount += product.price;
    });
    return amount;
  };
}
