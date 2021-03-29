const { Router } = require("express");
const AdminUser = require("../models/AdminUser");
const Dish = require("../models/Dish");
const router = Router();

router.post("/send-dish", async (req, res) => {
  let dish = req.body.dish;
  const user = await AdminUser.findOne({
    _id: "60605ae2eb88814053725f0e",
  });
  user.edit_dishes.push(dish);
  await user.save();
  res.status(200).json({ message: "редакция по блюду отправлена" });
});

router.post("/delete-dish", async (req, res) => {
  let dish = req.body.dish;
  const user = await AdminUser.findOne({
    _id: "60605ae2eb88814053725f0e",
  });

  user.edit_dishes = user.edit_dishes.filter((item) => item.time !== dish.time);
  res.status(200).json({ message: "блюдо удалено" });
  await user.save();
});

router.post("/update-dish", async (req, res) => {
  let dish = req.body.dish;
  const dishToUpdate = await Dish.findOneAndUpdate(
    {
      _id: dish._id,
    },
    {
      ...dish,
    },
    {
      new: true,
    }
  );
  await dishToUpdate.save();
  res.status(200).json({ message: "блюдо обновлено" });
});

router.get("/load-dishes", async (req, res) => {
  const editDishes = await AdminUser.findOne({
    _id: "60605ae2eb88814053725f0e",
  });
  res.json(editDishes.edit_dishes);
});

module.exports = router;
