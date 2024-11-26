const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middleware/Auth');

const router = express.Router();

router.post('/Login', authenticateUser, (req, res) => {
  const user = req.user;

  // Informações que serão armazenadas no token
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  // Gera o token JWT
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({
    message: 'Login successful',
    token,
  });
});

module.exports = router;
