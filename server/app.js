const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

const PORT = config.get("port") || 5000;

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api/dishes", require("./routes/dish_routes"));

app.use(async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

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
