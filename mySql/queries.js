function addUser(email, password) {
  return `INSERT INTO users (email, password) VALUES ("${email}", "${password}")`;
}

function addToken(token, userId) {
  return `INSERT INTO sessions (token, user_id) VALUES ("${token}", ${userId})`;
}

module.exports = { addUser, addToken };
