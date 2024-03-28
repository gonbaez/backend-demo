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

module.exports = checkIsUser;
