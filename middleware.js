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

function checkIsUser(req, res, next) {
  const user = req.users.find((user) => {
    return req.body.email === user.email;
  });

  if (!user) {
    res.send({ status: 0, reason: "User not found" });
    return;
  }

  console.log("User found");
  next();
}

function checkToken(req, res, next) {
  const token = Number(req.headers.token);
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  const user = req.users.find((user) => user.token.includes(token));
  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }

  req.authedUser = user;
  next();
}

module.exports = { logging, userAgent, checkToken, checkIsUser };
