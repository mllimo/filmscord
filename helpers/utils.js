const jwt = require('jsonwebtoken');

function generateToken(uid = '') {

  return Promise((resolve, reject) => {
    const options = {
      expiresIn: '30d'
    };
  
    jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

}

module.exports = {
  generateToken
};