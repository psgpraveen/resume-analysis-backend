const express = require('express');
const jwt = require('jsonwebtoken');
const Applicant = require('../models/applicant');
const { decrypt } = require('../utils/encryptDecrypt');
const router = express.Router();

router.post('/search', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const applicants = await Applicant.find();
    
    // Decrypt names and filter matching records (case-insensitive)
    const results = applicants.filter(applicant =>
      decrypt(applicant.name).toLowerCase().includes(name.toLowerCase())
    );

    if (!results.length) return res.status(404).json({ error: 'No matching records found' });

    // Decrypt sensitive fields before returning response
    const decryptedResults = results.map(applicant => ({
      ...applicant._doc,
      name: decrypt(applicant.name),
      email: decrypt(applicant.email),
    }));

    res.status(200).json(decryptedResults);

  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
