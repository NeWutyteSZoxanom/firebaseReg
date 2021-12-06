const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const admin = require("firebase-admin");
const generatePass = require("password-generator");

const db = admin.firestore();

class User {
  async create(req, res) {
    try {
      const userRef = db.collection("users");
      const { email, password } = req.body;

      let user = await userRef.where("email", "==", email).get();
      if (!user.empty) {
        return res
          .status(400)
          .json({ errors: "этот Email уже зарегистрирован " });
      }
      const id = generatePass(6, false);

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await db.collection("users").doc(id).set({
        id,
        email,
        password: hashPassword,
      });
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = new User();
