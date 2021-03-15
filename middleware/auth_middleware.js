const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.body.authorization || req.query.params;
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте еще раз",
    });
  }
};
