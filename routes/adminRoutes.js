const express = require('express');
const { authenticateAdmin } = require('../middlewares/authMiddleware');
const { loginAdmin, addStudent, assignTask } = require('../controllers/adminController');

const router = express.Router();

// Endpoint: /admin/login
router.post('/login', authenticateAdmin, loginAdmin);

// Endpoint: /admin/add-student
router.post('/add-student', authenticateAdmin, addStudent);

// Endpoint: /admin/assign-task
router.post('/assign-task', authenticateAdmin, assignTask);

module.exports = router;
