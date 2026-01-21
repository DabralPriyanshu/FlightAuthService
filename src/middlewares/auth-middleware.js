const validateUserAuth = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Email or password missing in the incoming request",
    });
  }
  next();
};
module.exports = { validateUserAuth };
