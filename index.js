const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes')
const database = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

database.connect();

app.use(bodyParser.json());

// Admin Routes
app.use('/admin', adminRoutes);
//student Routes
app.use('/student', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
