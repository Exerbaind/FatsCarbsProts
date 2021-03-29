const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
var multer = require("multer");
const DishPhoto = require("./models/DishImage");
const AdminUser = require("./models/AdminUser");

app.use(express.json({ extended: true }));
app.use(cors());

app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api/data", require("./routes/data_routes"));
app.use("/api/edit", require("./routes/editFood_routes"));
app.use("/api/favorite", require("./routes/favoriteFood_routes"));
app.use("/api/new", require("./routes/newFood_routes"));

app.use(async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Файл

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  // filename: function (req, file, cb) {
  //   cb(null, Date.now() + file.originalname);
  // },
});

var upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));

app.post(
  "/api/new/dish-photo",
  upload.single("wallpaper"),
  function (req, res) {
    let file = req.body.file;
    // var imagePath = req.file.replace(/^public\//, "");
    res.redirect(file);
  }
);

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, "client/build/images");
//     cb(null, "./public/images/");
//   },
// });

// app.use(express.static(path.join(__dirname, "public")));

// var upload = multer({ storage: storage });

// app.post("/api/new/dish-photo", async function (req, res) {
//   const file = req.body.file;
//   upload.single(file);
//   const user = await AdminUser.findOne({
//     email: "digr98@gmail.com",
//   });
//   let newFile = new DishPhoto({ filename: file });
//   user.new_dishes_photo.push(newFile);

//   await user.save();
//   res.status(200).json({ message: "фото блюда отправлено" });
// });

// app.get("/api/new/dish-photo-load", async (req, res) => {
//   const user = await AdminUser.findOne({
//     email: "digr98@gmail.com",
//   });
//   res.json(user.new_dishes_photo);
// });

app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) res.status(500).send(err.message);
  else next(err);
});

//

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

async function databaseConnect() {
  try {
    await mongoose.connect(config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server is not response", error.message);
    process.exit(1);
  }
}

databaseConnect();
