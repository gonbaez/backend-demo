const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");
const asyncMySQL = require("../mySql/driver");
const { addToken } = require("../mySql/queries");

const mongoose = require("mongoose");
const { User } = require("../mongoose/models");
const { userSchema } = require("../mongoose/schemas");

router.post("/", async (req, res) => {
  const connection = await mongoose.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: false,
  });

  mongoose.connection.on("error", (error) => {
    console.log("MongoDB Connection Error", error);
  });

  let { email, password } = req.body;

  password = sha256(password + salt);

  // const result = await asyncMySQL(
  //   `SELECT * FROM users WHERE email LIKE "${email}" AND password LIKE "${password}";`
  // );

  const result = await User.find({ email, password });

  console.log(result);
  if (result.length === 0) {
    res.send({ status: 0, reason: "Invalid email or password" });
    return;
  }

  const token = uuid.v4();

  // await asyncMySQL(addToken(result[0].id, token));

  res.send({ status: 1, token: token });
});

module.exports = router;
