const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json({ extended: true }));
app.use(cors());

app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api/data", require("./routes/data_routes"));
app.use("/api/edit", require("./routes/editFood_routes"));
app.use("/api/favorite", require("./routes/favoriteFood_routes"));
app.use("/api/new", require("./routes/newFood_routes"));
app.use("/api/photo", require("./routes/newPhoto_routes"));

app.use(async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

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
