const express = require('express');
const { authenticateStudent } = require('../middlewares/authMiddleware');
const { loginStudent, seeStatus, getTasksByStudentId, updateTaskStatusById } = require('../controllers/studentController');

const router = express.Router();

// Endpoint: POST /student/login
router.post('/login', authenticateStudent, loginStudent);

// Endpoint: GET /student/tasks/student-id
router.get('/tasks/:studentId', getTasksByStudentId);

// Endpoint: PUT /student/update-status
router.put('/update-status', updateTaskStatusById);

// Endpoint: GET /student/see-status/task-id
router.get('/see-status/:taskId', seeStatus)

module.exports = router;
