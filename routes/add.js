const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const salt = require("../secrets");
const asyncMySQL = require("../mySql/driver");
const { addUser, addToken } = require("../mySql/queries");
const uuid = require("uuid");

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

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing email or password" });
  }

  password = sha256(password + salt);

  const token = uuid.v4();

  // Now lets use the DB
  try {
    // const result = await asyncMySQL(addUser(email, password));
    // await asyncMySQL(addToken(result.insertId, token));

    const user = new User({ email, password, token });
    const result = await user.save();

    console.log(result);

    res.send({ status: 1, token });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Duplicate user" });
  }
});

module.exports = router;
