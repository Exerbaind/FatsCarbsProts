const { Router } = require("express");
const AdminUser = require("../models/AdminUser");
const Dish = require("../models/Dish");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = Router();

router.get("/load-dishes", async (req, res) => {
  const dishname = req.query.params;
  let searchedDishes = [];
  let allDishes = await Dish.find({})
    .lean()
    .then((res) => {
      return res;
    });
  allDishes.map((dish) => {
    if (dish.name.toLocaleLowerCase().includes(dishname.toLocaleLowerCase())) {
      searchedDishes.push(dish);
    }
  });
  if (searchedDishes.length) {
    res.json(searchedDishes);
  } else {
    res.json("ничего не найдено");
  }
});

module.exports = router;
