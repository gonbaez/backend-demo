function getUser(users, email, password) {
  return users.find(
    (user) => user.email === email && user.password === password
  );
}

function getUserById(users, id) {
  return users.findIndex((user) => user._id === id);
}

module.exports = { getUser, getUserById };
