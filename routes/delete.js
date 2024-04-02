const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");

const { getUser, getUserById } = require("../utils");

const { checkToken } = require("../middleware");

router.delete("/:id", checkToken, (req, res) => {
  // const { id } = req.params;
  // const { users, body, lastUserId } = req;

  // if (!id) {
  //   res.send({ status: 0, reason: "Missing id" });
  // }

  // const idx = getUserById(users, id);

  // if (idx === -1) {
  //   res.send({ status: 0, reason: "User not found" });
  //   return;
  // }

  const userIndex = req.users.findIndex(
    (user) => user._id === req.authedUser._id
  );
  req.users.splice(userIndex, 1);
  res.send({ status: 1, _id: req.authedUser._id });
});

module.exports = router;
