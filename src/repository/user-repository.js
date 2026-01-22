const { where } = require("sequelize");
const { User } = require("../models/index");
const { Role } = require("../models/index");
const ValidationError = require("../utils/validation-error");
const ClientError = require("../utils/client-error");
const { StatusCodes } = require("http-status-codes");
class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if ((error.name = "SequelizeValidationError")) {
        throw new ValidationError(error);
      }
      console.log(error);
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
  async destroy(userId) {
    try {
      await User.destroy({ where: { id: userId } });
      return true;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
  async getById(userId) {
    try {
      return await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({ where: { email: userEmail } });
      if (!user) {
        let err = {
          name: "Client Error",
          message: "Invalid email",
          explanation: "User with this email not found",
          statusCode: StatusCodes.NOT_FOUND,
        };
        throw new ClientError(err);
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({ where: { name: "ADMIN" } });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
}
module.exports = UserRepository;
