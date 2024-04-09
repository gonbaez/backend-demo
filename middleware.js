const asyncMySQL = require("./mySql/driver");

const { checkToken } = require("./mySql/queries");

// login middleware
function logging(req, res, next) {
  console.log("GET verb used to access / route");
  next();
}

async function checkIsUser(req, res, next) {
  const result = await asyncMySQL(checkToken(req.headers.token));

  if (result.length) {
    next();
    return;
  }

  res.send({ status: 0, reason: "Unauthorized" });
}

module.exports = { logging, checkIsUser };
