const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");
const { getRandom } = require("../utils");

router.post("/", (req, res) => {
  const user = req.users.find((user) => {
    return (
      user.email == req.body.email &&
      user.password == sha256(req.body.password + salt)
    );
  });

  if (!user) {
    res.send({ status: 0, reason: "Invalid email or password" });
    return;
  }

  const token = getRandom();
  user.token ? user.token.push(token) : (user.token = [token]);

  res.send({ status: 1, token: token });
});

module.exports = router;
