const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  async create(data) {
    try {
      return this.repository.create(data);
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }
  async getById(userId) {
    try {
      return this.repository.getById(userId);
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }
  createToken(user) {
    try {
      return jwt.sign(user, JWT_KEY, { expiresIn: "2d" });
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }
  verifyToken(token) {
    try {
      return jwt.sign(token, JWT_KEY);
    } catch (error) {
      console.log("Something went wrong in token validation");
      throw error;
    }
  }
  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
}
module.exports = UserService;
