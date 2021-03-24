const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  restaurant: { type: String, required: true },
  city: { type: String, required: true },
  category: { type: String },
  price: { type: Number },
  composition: { type: String },
  weight: { type: String, required: true },
  size: { type: String, required: true },
  kcals: { type: Number, required: true },
  prots: { type: Number, required: true },
  fats: { type: Number, required: true },
  carbs: { type: Number, required: true },
  inBasket: false,
  inFavorite: false,
});

module.exports = model("Dish", schema);
