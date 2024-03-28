const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");

const checkIsUser = require("./middleware");

const { getUser, getUserById } = require("../utils");

router.get("/", (req, res) => {
  res.send(req.users);
});

// root middleware
router.get("/demo", checkIsUser, (req, res) => {
  res.send("you made it to the root");
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

module.exports = router;
