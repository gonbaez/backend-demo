const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const salt = require("../secrets");
const asyncMySQL = require("../mySql/driver");
const { addUser } = require("../mySql/queries");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing email or password" });
  }

  password = sha256(password + salt);

  // Now lets use the DB
  try {
    const result = await asyncMySQL(addUser(email, password));

    res.send({ status: 1 });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Duplicate user" });
  }
});

module.exports = router;
