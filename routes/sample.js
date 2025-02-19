const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Backend Status</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #007bff;
                }
                p {
                    font-size: 18px;
                }
                a {
                    display: inline-block;
                    text-decoration: none;
                    background: #007bff;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin-top: 10px;
                    transition: 0.3s;
                }
                a:hover {
                    background: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 Backend is Running Successfully!</h1>
                <p>Developed by <strong>psgpraveen</strong></p>
                <a href="https://psgpraveen.github.io/port/" target="_blank">🌐 Visit My Portfolio</a>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;
