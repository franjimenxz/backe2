import ProductRepository from "./product.repository.js";
import Product from "../mongo/classes/product.dao.js";
import CartRepository from "./cart.repository.js";
import Cart from "../mongo/classes/cart.dao.js";
import UserRepository from "./user.repository.js";
import User from "../mongo/classes/user.dao.js";
import TicketRepository from "./ticket.repository.js";
import Ticket from "../mongo/classes/ticket.dao.js";

export const productService = new ProductRepository(new Product());
export const cartService = new CartRepository(new Cart());
export const userService = new UserRepository(new User());
export const ticketService = new TicketRepository(new Ticket());
