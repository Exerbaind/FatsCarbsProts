const { Router } = require("express");
const AdminUser = require("../models/AdminUser");
const Dish = require("../models/Dish");
const config = require("config");
const router = Router();

router.post("/send", async (req, res) => {
  let newDish = req.body.dish;
  const dish = new Dish({ ...newDish });
  const user = await AdminUser.findOne({
    email: "digr98@gmail.com",
  });
  user.new_dishes.push(dish);
  await user.save();
  res.status(200).json({ message: "новое блюдо" });
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

router.post("/add", async (req, res) => {
  let dish = req.body.dish;
  const newDish = await Dish({ ...dish });
  await newDish.save();
  res.status(200).json({ message: "блюдо добавлено" });
});

module.exports = router;
