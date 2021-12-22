
const EMAIL_REGEX = /^\S+@\S+\.\S+$/

function isEmail(string) {
  return EMAIL_REGEX.test(string);
}

module.exports = {
  isEmail
}