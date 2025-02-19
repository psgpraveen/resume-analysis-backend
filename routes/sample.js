const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  
 
    return res.status(200).json("Backend Is working properly");
 
});

module.exports = router;
