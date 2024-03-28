const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");

const { getUser, getUserById } = require("../utils");

router.delete("/:id", (req, res) => {
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

  users.splice(idx, 1);
  res.send({ status: 1, _id: id });
});

module.exports = router;
