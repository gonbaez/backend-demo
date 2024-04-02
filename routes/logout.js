const express = require("express");
const router = express.Router();

const { checkToken } = require("../middleware");

router.delete("/", checkToken, (req, res) => {
  req.authedUser.token.splice(
    req.authedUser.token.indexOf(req.authedUser.token),
    1
  );
  res.send({ status: 1, message: "Logged out" });
});

module.exports = router;
