const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("pipi");
});
router.post("/", userController.create);

module.exports = router;
