const { check, validationResult } = require("express-validator");

module.exports.userRegisterRules = () => [
  check("firstName", "first Name is required").notEmpty(),
  check("lastName", "last Name is required").notEmpty(),
  check("email", "email field should be a valid email").isEmail(),
  check("password", "password should have at least 6 caracters").isLength({
    min: 6,
  }),
];
module.exports.workerRegisterRules = () => [
  check("email", "email should be a valid email").isEmail(),
  check("password", "password should have at least 6 caracters").isLength({
    min: 6,
  }),
  check("firstName", "first Name is required").notEmpty(),
  check("lastName", "last Name is required").notEmpty(),
  check("phoneNumber", "phone number is required").notEmpty(),
  check("profession", "profession is required").notEmpty(),
  check("localisation", "localisation is required").notEmpty(),
];
module.exports.logInRules = () => [
  check("email", "email field should be a valid email").isEmail(),
  check("password", "password should have at least 6 caracters").isLength({
    min: 6,
  }),
];

module.exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  } else {
    next();
  }
};
