require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const searchRoutes = require('./routes/search');
const sample = require('./routes/sample');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', resumeRoutes);
app.use('/api', searchRoutes);
app.use('/', sample);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI,).then(() => {
    console.log("MongoDB is Connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
  })
  .catch(err => console.error(err));
