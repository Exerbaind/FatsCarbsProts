const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

const PORT = config.get("port") || 5000;

app.use("api/auth", require("./routes/auth_routes"));

async function databaseConnect() {
  try {
    await mongoose.connect(config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`server been started on port ${PORT} and database connected`);
    });
  } catch (error) {
    console.log("Server is not response", error.message);
    process.exit(1);
  }
}

databaseConnect();
