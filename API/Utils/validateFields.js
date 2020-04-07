const error = require("./error");

function validateUser(user) {
  const { name, password, username } = user;

  validateField("name", name);
  validateField("username", username);
  validateField("password", password);
}

function validateField(key, value) {
  if (!value) {
    throw error(`Campo ${key} VACIO`, 401);
  }
}

module.exports = {
  validateUser,
  validateField,
};
