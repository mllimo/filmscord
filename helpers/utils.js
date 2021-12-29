const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function generateToken(uid = '') {
  return new Promise((resolve, reject) => {
    const options = {
      expiresIn: '30d'
    };
    const payload = { uid };
    jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        reject('Error generating token');
      } else {
        resolve(token);
      }
    });
  });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(5);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}
module.exports = {
  generateToken,
  hashPassword
};