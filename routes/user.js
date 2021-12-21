const { Router } = require('express');

const router = new Router();

router.post('/login', (req, res) => {
  res.json({
    message: 'Login successful'
  });
});

router.post('/signup', (req, res) => {
  res.json({
    message: 'Signup successful'
  });
});


module.exports = router;