const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/auth', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'psgpraveen' && password === 'psgpraveen') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ JWT: token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;
