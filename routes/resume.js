const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Applicant = require('../models/applicant');
const { encrypt } = require('../utils/encryptDecrypt');
const router = express.Router();

router.post('/resume', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received Token:', token);

    try {
        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token is valid:', decoded);

        const { raw_text } = req.body;
        if (!raw_text) return res.status(400).json({ error: 'No raw text provided' });

        // Prompt for structured data extraction
        const prompt = `
        Extract and structure the following resume text into JSON format. If any data is missing, leave the field empty:

        JSON Format:
        {
          "name": "<Extracted Name>",
          "email": "<Extracted Email>",
          "education": {
            "degree": "<Extracted Degree>",
            "branch": "<Extracted Branch>",
            "institution": "<Extracted Institution>",
            "year": "<Extracted Year>"
          },
          "experience": {
            "job_title": "<Extracted Job Title>",
            "company": "<Extracted Company>"
          },
          "skills": ["<Skill 1>", "<Skill 2>", "<Skill 3>", ...],
          "summary": "<Generate a short professional summary based on the candidate's resume>"
        }

        Resume Text:
        ${raw_text}
        `;

        // Call Google Gemini API
        let extractedData;
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
                { contents: [{ parts: [{ text: prompt }] }] }
            );

            if (response.status === 200 && response.data?.candidates?.length > 0) {
                let extractedText = response.data.candidates[0].content.parts[0].text;
                console.log('Raw Extracted Data:', extractedText);

                // **Fix: Remove backticks and "json" label from response**
                extractedText = extractedText.replace(/```json|```/g, '').trim();

                // Convert to JSON
                extractedData = JSON.parse(extractedText);
            } else {
                console.error('Gemini API responded with a non-200 status:', response.status, response.data);
                return res.status(response.status).json({ error: 'Gemini API request failed', details: response.data });
            }
        } catch (apiError) {
            console.error('Error calling Gemini API:', apiError.message);
            return res.status(500).json({ error: 'Failed to connect to Gemini API', details: apiError.message });
        }

        // Validate extractedData
        if (!extractedData || typeof extractedData !== 'object') {
            return res.status(500).json({ error: 'Invalid data format received from Gemini API' });
        }

        // Encrypt sensitive fields before saving to DB
        if (extractedData.name) extractedData.name = encrypt(extractedData.name);
        if (extractedData.email) extractedData.email = encrypt(extractedData.email);

        // Save to MongoDB
        const applicant = new Applicant(extractedData);
        await applicant.save();

        res.status(200).json({ message: 'Resume processed successfully', extractedData });

    } catch (err) {
        console.error('JWT Verification Failed:', err.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});

module.exports = router;
