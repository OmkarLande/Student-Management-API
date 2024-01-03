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

app.use('/', (req, res)=> {
  return res.json({message: "Student Management API is working follow this documentation https://documenter.getpostman.com/view/26807468/2s9YsFFEi5"})
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
