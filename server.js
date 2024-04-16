const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();

// Only for when we get an error
const cors = require("cors");
app.use(cors());

// Body middleware
app.use(express.json());

app.use(cookieParser());

app.use("/user/get", require("./routes/get"));
app.use("/user/add", require("./routes/add"));
app.use("/user/update", require("./routes/update"));
app.use("/user/delete", require("./routes/delete"));
app.use("/user/login", require("./routes/login"));
app.use("/user/logout", require("./routes/logout"));
app.use("/proxy", require("./routes/proxy"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
