const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const uuid = require("uuid");
const salt = require("../secrets");
const asyncMySQL = require("../mySql/driver");
const { addToken } = require("../mySql/queries");
const chalk = require("chalk");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  ////////// hacking prevention
  // if (email === "%") {
  // The following would be better:
  if (email.includes("%")) {
    res.send("Hacker detected!");
    return;
  }
  // SQL Injection
  // { "email": "a@b.c\" OR password NOT LIKE \"", "password": ""}
  // { "email": "a@b.c\" OR id > \"0", "password": ""}
  // { "email": "a@b.c\" OR email NOT LIKE \"\" OR password NOT LIKE \"", "password": ""}
  if (email.includes("asdf")) {
    res.send("Hacker detected!");
    return;
  }
  //////////

  console.log(chalk.red("req.body:", JSON.stringify(req.body)));

  password = sha256(password + salt);

  console.log(chalk.yellow("sha256 password:", sha256(password + salt)));

  //const sql = `SELECT * FROM users WHERE email LIKE "${email}" AND password LIKE "${password}";`;
  const sql = `SELECT * FROM users WHERE email LIKE ? AND password LIKE ?;`;

  const result = await asyncMySQL(sql, [email, password]);

  console.log(chalk.blue("query:", sql));

  console.log(chalk.whiteBright("result:", JSON.stringify(result)));

  if (result.length === 0) {
    res.send({ status: 0, reason: "Invalid email or password" });
    return;
  }

  if (result.length > 1) {
    res.send("Hacker detected!");
    return;
  }

  const token = uuid.v4();

  await asyncMySQL(addToken(result[0].id, token));

  res.send({ status: 1, token: token });
});

module.exports = router;
