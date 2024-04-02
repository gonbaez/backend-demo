function getUser(users, email, password) {
  return users.find(
    (user) => user.email === email && user.password === password
  );
}

function getUserById(users, id) {
  return users.findIndex((user) => user._id === id);
}

function getRandom() {
  return Math.floor(Math.random() * 10000000000);
}

module.exports = { getUser, getUserById, getRandom };
