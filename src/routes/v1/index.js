const express = require("express");
const UserController = require("../../controllers/user-controller");
const { AuthMiddleware } = require("../../middlewares/index");
const router = express.Router();
//routes
router.post("/signup", AuthMiddleware.validateUserAuth, UserController.create);
router.post("/signin", AuthMiddleware.validateUserAuth, UserController.signIn);
router.get("/users/:id", UserController.getById);

module.exports = router;
