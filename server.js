const express = require("express");
const app = express();

// User state
const users = [];
let lastUserId = { value: 0 };

// Body middleware
app.use(express.json());

// middleware to add data to request
app.use(function (req, res, next) {
  req.users = users;
  req.lastUserId = lastUserId;
  next();
});

// user route
app.use("/user", require("./routes/user"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
