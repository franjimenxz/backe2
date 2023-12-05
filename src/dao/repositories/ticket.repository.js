export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addTicket = async (cart, purchaser) => {
    return await this.dao.add(cart, purchaser);
  };
  getTickets = async () => {
    return await this.dao.get();
  };

  getTicketById = async (id) => {
    return await this.dao.getById(id);
  };
  deleteTicketById = async (id) => {
    return await this.dao.deleteById(id);
  };
  updateTicketById = async (id, ticket) => {
    return await this.dao.updateById(id, ticket);
  };
  getTicketsWithParams = async (params) => {
    return await this.dao.getWithParams(params);
  };
}
