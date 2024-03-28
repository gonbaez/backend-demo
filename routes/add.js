const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");

const { getUser, getUserById } = require("../utils");

router.post("/", (req, res) => {
  const { users, body, lastUserId } = req;
  let { email, password } = body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing email or password" });
  }

  password = sha256(password + salt);

  const user = req.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send({ status: 0, reason: "Duplicate account" });
    return;
  }

  // add user
  lastUserId.value++;
  const _id = uuid.v4();
  req.users.push({ email, password, _id });
  res.send({ status: 1, _id });
});

module.exports = router;
