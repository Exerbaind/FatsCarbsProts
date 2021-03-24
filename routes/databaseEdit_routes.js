const { Router } = require("express");
const AdminUser = require("../models/AdminUser");
const Dish = require("../models/Dish");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = Router();
// const auth = require("../middleware/auth_middleware");

router.get("/load-dishes", async (req, res) => {
  Dish.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.post("/edit-dish", async (req, res) => {
  let dish = req.body.dish;
  const user = await AdminUser.findOne({
    _id: "60579cfd6716641249bc6ea6",
  });
  user.edit_dishes.push(dish);
  await user.save();
  res.status(200).json({ message: "редакция по блюду отправлена" });
});

router.post("/edit-dish/delete", async (req, res) => {
  let dish = req.body.dish;
  const user = await AdminUser.findOne({
    _id: "60579cfd6716641249bc6ea6",
  });

  user.edit_dishes = user.edit_dishes.filter((item) => item.time !== dish.time);
  res.status(200).json({ message: "блюдо удалено" });
  await user.save();
});

router.get("/edit-dishes", async (req, res) => {
  const editDishes = await AdminUser.findOne({
    _id: "60579cfd6716641249bc6ea6",
  });
  res.json(editDishes.edit_dishes);
});

// router.post("/favorite", auth, async (req, res) => {
//   let dish = req.body.dish;
//   const user = await User.findOne({
//     _id: req.user.userId,
//   });
//   let existing = user.favorites_dishes.filter((item) => item.id === dish.id);

//   if (existing.length) {
//     user.favorites_dishes = user.favorites_dishes.filter(
//       (item) => item.id !== dish.id
//     );
//     res.status(200).json({ message: "блюдо удалено из избранного" });
//   } else {
//     user.favorites_dishes.push(dish);
//     res.status(200).json({ message: "блюдо добавлено в избранное" });
//   }
//   await user.save();
// });

// router.get("/favorite", auth, async (req, res) => {
//   const dishes = await User.findOne({
//     _id: req.user.userId,
//   });
//   res.json(dishes.favorites_dishes);
// });

module.exports = router;
