// login middleware
function logging(req, res, next) {
  console.log("GET verb used to access / route");
  next();
}

// hacker prevention middleware
function userAgent(req, res, next) {
  console.log(req.headers);
  console.log(req.headers["user-agent"]);

  if (req.headers["user-agent"].includes("insomnia")) {
    res.redirect(301, "https://www.google.com");
    res
      .status(404)
      .send("We do not support insomnia. Please use a browser instead.");
  } else {
    res.send("Welcome to the site!");
  }
}

module.exports = { logging, userAgent };
