const { validationResult } = require('express-validator');
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

async function validateFields(req = request, res = response, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

async function validateJwt(req = request, res = response, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.id = payload.uid;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {
  validateFields,
  validateJwt
};