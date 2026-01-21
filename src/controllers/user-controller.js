const UserService = require("../services/user-service");
const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      message: "Successfully created a user",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "No able to create a user",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = { create };
