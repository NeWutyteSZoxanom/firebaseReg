require("dotenv").config();
//const routers = require("./routes/api/register");
const admin = require("firebase-admin");
const seviceAcc = require("./config/conf.json");
const express = require("express");
const bdoyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

admin.initializeApp({
  credential: admin.credential.cert(seviceAcc),
});
const app = express();

app.use(express.json());
app.use("/api", require("./routes/api/register"));
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server working ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
