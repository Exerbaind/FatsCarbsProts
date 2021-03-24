const { Router } = require("express");
const Dish = require("../models/Dish");
const AdminUser = require("../models/AdminUser");
const config = require("config");
const router = Router();

router.post("/add", async (req, res) => {
  let newDish = req.body.dish;
  const dish = new Dish({ ...newDish });
  const user = await AdminUser.findOne({
    email: "digr98@gmail.com",
  });
  user.new_dishes.push(dish);
  await user.save();
  res.status(200).json({ message: "новое блюдо" });

  // await dish.save();
});

router.get("/load", async (req, res) => {
  const newDishes = await AdminUser.findOne({
    email: "digr98@gmail.com",
  });
  res.json(newDishes.new_dishes);
});

router.post("/delete", async (req, res) => {
  let dish = req.body.dish;
  const user = await AdminUser.findOne({
    email: "digr98@gmail.com",
  });

  user.new_dishes = user.new_dishes.filter((item) => item._id != dish._id);
  await user.save();
  res.status(200).json({ message: "блюдо удалено" });
});

module.exports = router;
