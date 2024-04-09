const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mySql/driver");
const { checkIsUser } = require("../middleware");
const { deleteToken } = require("../mySql/queries");

router.delete("/", checkIsUser, async (req, res) => {
  const result = await asyncMySQL(deleteToken(req.headers.token));

  res.send({ status: 1 });
});

module.exports = router;
