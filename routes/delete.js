const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");

const { checkIsUser } = require("../middleware");
const asyncMySQL = require("../mySql/driver");
const { deleteUser } = require("../mySql/queries");

router.delete("/", checkIsUser, async (req, res) => {
  const result = await asyncMySQL(deleteUser(req.headers.token));

  res.send({ status: 1 });
});

module.exports = router;
