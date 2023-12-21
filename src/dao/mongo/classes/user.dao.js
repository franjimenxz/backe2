import { userModel } from "../models/user.model.js";

class User {
  register = async (user) => {
    try {
      return await userModel.create(user);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  get = async (email) => {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  addCart = async (email, id) => {
    try {
      return await userModel.updateOne({ email }, { $set: { cart: id } });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  update = async (email, data) => {
    try {
      return await userModel.updateOne({ email }, { $set: data });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getById = async (id) => {
    try {
      return await userModel.findById(id);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export default User;
