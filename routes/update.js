const express = require("express");
const router = express.Router();

const sha256 = require("sha256");
const salt = require("../secrets");

const { checkIsUser } = require("../middleware");

const asyncMySQL = require("../mySql/driver");
const { updateUser } = require("../mySql/queries");

router.patch("/", checkIsUser, async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 0, reason: "Missing email or password" });
  }

  if (email) {
    const emailResult = await asyncMySQL(
      updateUser(req.headers.token, "email", email)
    );
    console.log(emailResult);
  }
  if (password) {
    const passwordResult = await asyncMySQL(
      updateUser(req.headers.token, "password", sha256(password + salt))
    );
    console.log(passwordResult);
  }

  res.send({ status: 1 });
});

module.exports = router;
