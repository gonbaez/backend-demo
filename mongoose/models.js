const mongoose = require("mongoose");
const { userSchema } = require("./schemas");

// const connection = require("./driver");

const User = mongoose.model("User", userSchema);

module.exports = { User };
