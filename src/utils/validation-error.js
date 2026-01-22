const { StatusCodes } = require("http-status-codes");
const AppErrors = require("./error-handler");

class ValidationError extends AppErrors {
  constructor(error) {
    let errorName = error.name;
    let explanation = [];
    error.errors.forEach((e) => {
      explanation.push(e.message);
    });

    super(
      errorName,
      "No able to validate the data sent in the request",
      explanation,
      StatusCodes.BAD_REQUEST,
    );
  }
}
module.exports = ValidationError;
