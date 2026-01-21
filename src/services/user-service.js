const UserRepository = require("../repository/user-repository");

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
}
module.exports = UserService;
