const express = require("express");
const app = express();
const { logging, userAgent } = require("./middleware");

// Middleware
// handle reques to static files
app.use(express.static("public"));
app.use(express.json()); // waits for all the bits of the body to arrive before parsing it

// add routes
// app.use("/", require("./routes/simpsons"));

app.use("/demo", require("./routes/demos"));

app.use(logging);

app.use(userAgent);

app.use(express.json());

// handle requests for dynamic data
app.get("/", (req, res) => {
  res.status(404).send("Hello from the backend :) !");
});

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
