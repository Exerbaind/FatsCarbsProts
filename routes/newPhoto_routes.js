const { Router } = require("express");
const router = Router();
const DishPhoto = require("../models/DishImage");
const AdminUser = require("../models/AdminUser");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "client/public/images");
  //   cb(null, "client/build/images");
  // },
  // filename: function (req, file, cb) {
  //   cb(null, new Date().toISOString() + file.originalname);
  // },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("file", 10), async (req, res) => {
  const files = req.files;
  const restaurant = req.body.restaurant[0];
  const city = req.body.city[0];
  const user = await AdminUser.findOne({
    email: "digr98@gmail.com",
  });
  files.map((image) => {
    let compressedImage = path.join(
      "client",
      "build",
      "images",
      restaurant + new Date().getTime() + ".jpeg"
    );
    image.restaurant = restaurant;
    image.city = city;
    sharp(image.path)
      .resize(600, 600)
      .jpeg({
        quality: 80,
        chromaSubsampling: "4:4:4",
      })
      .toFile(compressedImage);
    let dishImage = new DishPhoto({ ...image });
    user.new_dishes_photo.push(dishImage);
  });
  await user.save();
  res.status(200).json({
    message: "фотографии отправлена",
  });
});

router.get("/download", async (req, res) => {
  const user = await AdminUser.findOne({
    email: "digr98@gmail.com",
  });
  res.json(user.new_dishes_photo);
});

module.exports = router;
