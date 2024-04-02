const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");

const { getUser, getUserById } = require("../utils");

const { checkToken } = require("../middleware");

router.patch("/:id", checkToken, (req, res) => {
  // const { id } = req.params;
  // const { users, body, lastUserId } = req;
  const { email, password } = req.body;

  // if (!id) {
  //   res.send({ status: 0, reason: "Missing id" });
  // }

  if (!(email || password)) {
    res.send({ status: 0, reason: "Missing email or password" });
  }

  // const idx = getUserById(users, id);
  // if (idx === -1) {
  //   res.send({ status: 0, reason: "User not found" });
  //   return;
  // }

  if (email) {
    req.authedUser.email = email;
    // users[idx].email = email;
  }
  if (password) {
    req.authedUser.password = sha256(password + salt);
    // users[idx].password = sha256(password + salt);
  }

  res.send({ status: 1, _id: req.authedUser._id });
});

router.patch("/append/:id", (req, res) => {
  const { id } = req.params;
  const { users } = req;

  if (!id) {
    res.send({ status: 0, reason: "Missing id" });
  }

  const idx = getUserById(users, id);

  if (idx === -1) {
    res.send({ status: 0, reason: "User not found" });
    return;
  }

  users[idx].newData = req.body;
  res.send({ status: 1, user: users[idx] });
});

module.exports = router;
