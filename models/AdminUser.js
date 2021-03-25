const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites_dishes: [{ type: Object }],
  edit_dishes: [{ type: Object }],
  new_dishes: [{ type: Object }],
  new_dishes_photo: [{ type: Object }],
});

module.exports = model("AdminUser", schema);
