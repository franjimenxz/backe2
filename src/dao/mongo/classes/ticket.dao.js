import { ticketModel } from "../models/ticket.model.js";
import TicketDTO from "../../dto/ticket.dto.js";

class Ticket {
  add = async (cart, purchaser) => {
    try {
      return await ticketModel.create(new TicketDTO(cart, purchaser));
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Pide todos los tickets a la base de datos
  get = async () => {
    try {
      const result = await ticketModel.find();
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Pide un ticket por id a la base de datos
  getById = async (id) => {
    try {
      let result = await ticketModel.findById({ _id: id });
      if (!result) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Elimina un ticket por id de la base de datos
  deleteById = async (id) => {
    try {
      let result = await ticketModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Actualiza un ticket por id de la base de datos
  updateById = async (id, ticket) => {
    try {
      let exist = await ticketModel.find({ _id: id });
      if (exist.length === 0) {
        return null;
      }
      return await ticketModel.updateOne({ _id: id }, ticket);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
export default Ticket;
