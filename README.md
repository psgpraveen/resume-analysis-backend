
---

# Resume Analysis Backend

A backend application for analyzing and enriching resume data using **Node.js**, **Express.js**, **MongoDB**, and **Google Gemini API**. The application provides RESTful APIs for user authentication, resume data enrichment, resume search, and a health check endpoint.

---

## Features

- **Authentication API**: Authenticate users and generate a JWT token for secure access.
- **Resume Data Enrichment API**: Process raw text from resumes, extract structured data using Google Gemini API, and store it in MongoDB.
- **Resume Search API**: Search resumes in the database by name with case-insensitive and token-agnostic matching.
- **Health Check Endpoint**: Verify if the backend is running successfully.
- **Data Encryption**: Sensitive fields like name and email are encrypted before being stored in the database.
- **JWT Authentication**: Secure access to APIs using JSON Web Tokens.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB Atlas**: Cloud-based NoSQL database for storing applicant data.
- **Google Gemini API**: Large Language Model (LLM) for extracting structured data from unstructured text.
- **CryptoJS**: For encrypting sensitive data.
- **JWT (jsonwebtoken)**: For user authentication and authorization.

---

## Prerequisites

Before running the project, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) (v14 or later)
2. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
3. [Google Cloud Account](https://console.cloud.google.com/) with access to the Gemini API
4. [Postman](https://www.postman.com/) or Thunder Client (VS Code extension) for testing APIs

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone 
   cd resume-analysis-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   PORT=3000
   MONGO_URI=
   JWT_SECRET=
   GEMINI_API_KEY=
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

---

## API Endpoints

### 1. Health Check Endpoint
Verify if the backend is running successfully.

- **Endpoint**: `GET /`
- **Response**:
  - Success (`200 OK`):
    ```html
    
      
        🚀 Backend is Running Successfully!
        Developed by psgpraveen
        Visit My Portfolio
      
    
    ```

---

### 2. Authentication API
Authenticate users and generate a JWT token.

- **Endpoint**: `POST /api/auth`
- **Request Body**:
  ```json
  {
    "username": "naval.ravikant",
    "password": "05111974"
  }
  ```
- **Response**:
  - Success (`200 OK`):
    ```json
    {
      "JWT": ""
    }
    ```
  - Failure (`401 Unauthorized`):
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

---

### 3. Resume Data Enrichment API
Extract structured data from raw text using Google Gemini API and store it in MongoDB.

- **Endpoint**: `POST /api/resume`
- **Headers**:
  ```plaintext
  Authorization: Bearer 
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "raw_text": "Scarlett Emerson has email-scarlett.emerson@hollywoodstudios.com..."
  }
  ```
- **Response**:
  - Success (`200 OK`):
    ```json
    {
      "message": "Resume processed successfully"
    }
    ```
  - Failure (`401 Unauthorized`):
    ```json
    {
      "error": "Invalid or expired token"
    }
    ```
  - Failure (`404 Not Found`):
    ```json
    {
      "error": "No raw text provided"
    }
    ```

---

### 4. Resume Search API
Search resumes in MongoDB by name.

- **Endpoint**: `POST /api/search`
- **Headers**:
  ```plaintext
  Authorization: Bearer 
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "name": "Scarlett"
  }
  ```
- **Response**:
  - Success (`200 OK`):
    ```json
    [
      {
        "name": "Scarlett Emerson",
        "email": "scarlett.emerson@hollywoodstudios.com",
        ...
      }
    ]
    ```
  - Failure (`401 Unauthorized`):
    ```json
    {
      "error": "Invalid or expired token"
    }
    ```
  - Failure (`404 Not Found`):
    ```json
    {
      "error": "No matching records found"
    }
    ```

---

## Project Structure

```
resume-analysis-backend/
├── .env                   # Environment variables file (not included in repo)
├── server.js              # Main server file
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── resume.js          # Resume enrichment routes
│   ├── search.js          # Resume search routes
├── models/
│   └── applicant.js       # MongoDB schema for applicants
├── utils/
│   └── encryptDecrypt.js  # Utility functions for encryption/decryption
└── package.json           # Project metadata and dependencies
```

---

## Testing Instructions

1. Use Postman or Thunder Client to test each endpoint.
2. Follow these steps for each API:
   - Call `/auth` to generate a JWT token.
   - Use this token in the `Authorization` header of `/resume` or `/search`.
3. Verify responses for both success and failure cases.

---

## Deployment

1. Deploy the backend on platforms like [Vercel](https://vercel.com/), [Render](https://render.com/), or [Railway](https://railway.app/).
2. Add environment variables securely in the deployment platform’s settings.
3. Use the deployed URL to test APIs.

---

## Future Improvements

1. Add support for multiple users with dynamic credentials stored in MongoDB.
2. Implement caching (e.g., Redis) to improve performance for frequently accessed data.
3. Add rate limiting to prevent abuse of public endpoints.

--- 
