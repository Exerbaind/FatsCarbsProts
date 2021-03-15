const { Router } = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = Router();
const auth = require("../middleware/auth_middleware");

router.post("/favorite", auth, async (req, res) => {
  let dish = req.body.dish;
  const user = await User.findOne({
    _id: req.user.userId,
  });
  let existing = user.favorites_dishes.filter((item) => item.id === dish.id);

  if (existing.length) {
    user.favorites_dishes = user.favorites_dishes.filter(
      (item) => item.id !== dish.id
    );
    res.status(200).json({ message: "блюдо удалено из избранного" });
  } else {
    user.favorites_dishes.push(dish);
    res.status(200).json({ message: "блюдо добавлено в избранное" });
  }
  await user.save();
});

router.get("/favorite", auth, async (req, res) => {
  const dishes = await User.findOne({
    _id: req.user.userId,
  });
  res.json(dishes.favorites_dishes);
});

module.exports = router;
