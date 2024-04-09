const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");

const { checkIsUser } = require("../middleware");

const asyncMySQL = require("../mySql/driver");
const { getUser } = require("../mySql/queries");

router.get("/:id", checkIsUser, async (req, res) => {
  const results = await asyncMySQL(getUser(req.headers.token));

  if (results.length === 0) {
    res.send({ status: 0, reason: "Invalid token" });
    return;
  }

  res.send({ status: 1, user: results[0] });
});

module.exports = router;
