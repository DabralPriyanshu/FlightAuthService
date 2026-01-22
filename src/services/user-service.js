const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");
const AppErrors = require("../utils/error-handler");
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  async create(data) {
    try {
      return this.repository.create(data);
    } catch (error) {
      console.log(error);
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      console.log("Something went wrong in service layer");
      throw new AppErrors();
    }
  }
  async signIn(email, password) {
    try {
      //get the user
      const user = await this.repository.getByEmail(email);
      //compare password
      const isPasswordCorrect = await this.checkPassword(
        password,
        user.password,
      );
      if (!isPasswordCorrect) {
        console.log("password does not match");
        throw { error: "Incorrect password" };
      }
      const newJwt = this.createToken({ email: user.email, id: user.id });
      return newJwt;
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
      return jwt.decode(token, JWT_KEY);
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
  async isAuthenticated(token) {
    try {
      const response = await this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.repository.getById(response.id);
      if (!user) {
        throw { error: "No user with this corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in authentication of user");
      throw error;
    }
  }
  async isAdmin(userId) {
    return this.repository.isAdmin(userId);
    try {
    } catch (error) {
      console.log("Something went wrong in authorization of user");
      throw error;
    }
  }
}
module.exports = UserService;
