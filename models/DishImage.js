const { Schema, model } = require("mongoose");

const schema = new Schema({
  fieldname: { type: String },
  originalname: { type: String },
  encoding: { type: String },
  mimetype: { type: String },
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size: { type: Number },
  restaurant: { type: String },
  city: { type: String },
});

module.exports = model("DishImage", schema);
