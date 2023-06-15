module.exports = isAdmin = (req, res, next) => {
  if (req.user.role == "admin" || req.user.role == "superAdmin") {
    next();
  } else {
    res.status(401).send({ msg: "access denied" });
  }
};
