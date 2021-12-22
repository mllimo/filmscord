const jwt = require('jsonwebtoken');

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

module.exports = {
  generateToken
};