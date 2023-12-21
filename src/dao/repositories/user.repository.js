export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUser(email) {
    return await this.dao.get(email);
  }

  async registerUser(user) {
    return await this.dao.register(user);
  }

  async addCartToUser(email, id) {
    return await this.dao.addCart(email, id);
  }

  async updateUser(email, data) {
    return await this.dao.update(email, data);
  }

  async getUserById(id) {
    return await this.dao.getById(id);
  }
}
