const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");
const asyncMySQL = require("../mySql/driver");
const { addToken } = require("../mySql/queries");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(password + salt);

  const result = await asyncMySQL(
    `SELECT * FROM users WHERE email LIKE "${email}" AND password LIKE "${password}";`
  );

  if (result.length === 0) {
    res.send({ status: 0, reason: "Invalid email or password" });
    return;
  }

  const token = uuid.v4();

  await asyncMySQL(addToken(result[0].id, token));

  res.send({ status: 1, token: token });
});

module.exports = router;
