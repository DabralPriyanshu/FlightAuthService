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
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userService.getById(id);
    return res.status(200).json({
      message: "Successfully fetched a user",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "No able to fetch the  user",
      data: {},
      success: false,
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password,
    );
    return res.status(200).json({
      message: "Successfully signed in",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Sign in failed",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      message: "Authentication successfully",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Authentication  failed",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = { create, getById, signIn, isAuthenticated };
