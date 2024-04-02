const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");

const { getUser, getUserById } = require("../utils");

const { checkIsUser, checkToken } = require("./middleware");

// no need to add users here
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

router.get("/", (req, res) => {
  res.send(req.users);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { users, body, lastUserId } = req;

  if (!id) {
    res.send({ status: 0, reason: "Missing id" });
  }

  const idx = getUserById(users, id);
  if (idx === -1) {
    res.send({ status: 0, reason: "User not found" });
    return;
  }

  res.send(users[idx]);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { users, body, lastUserId } = req;
  const { email, password } = body;

  if (!id) {
    res.send({ status: 0, reason: "Missing id" });
  }

  if (!(email || password)) {
    res.send({ status: 0, reason: "Missing email or password" });
  }

  const idx = getUserById(users, id);
  if (idx === -1) {
    res.send({ status: 0, reason: "User not found" });
    return;
  }

  if (email) {
    users[idx].email = email;
  }
  if (password) {
    users[idx].password = sha256(password + salt);
  }

  res.send({ status: 1, _id: id });
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
