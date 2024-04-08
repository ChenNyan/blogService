const joi = require("joi")

const username = joi.string().alphanum().min(1).max(16).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();


exports.login_rules = {
  body: {
    username,
    password,
  },
};