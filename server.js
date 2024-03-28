const express = require("express");
const app = express();

// Only for when we get an error
const cors = require("cors");
app.use(cors());

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
// app.use("/user", require("./routes/user"));

app.use("/user/get", require("./routes/get"));
app.use("/user/add", require("./routes/add"));
app.use("/user/update", require("./routes/update"));
app.use("/user/delete", require("./routes/delete"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
