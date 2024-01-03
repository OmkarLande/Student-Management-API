const Student = require('../models/studentModel')
const Task = require('../models/taskModel')

const loginAdmin = (req, res) => {
  res.json({ message: 'Admin logged in successfully' });
}

async function addStudent(req, res) {
  if (!req.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  const { name, email, department, password } = req.body;

  if (!name || !email || !department || !password) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ error: 'Student with this email already exists' });
    }
    const newStudent = new Student({
      name,
      email,
      department,
      password,
    });

    await newStudent.save();

    res.json({ message: 'Student added successfully', newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

async function assignTask(req, res) {
  if (!req.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  const { studentId, description, dueTime } = req.body;

  if (!studentId || !description || !dueTime) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const newTask = new Task({
      description,
      dueTime,
      student: studentId,
    });

    await newTask.save();

    student.tasks.push(newTask._id);
    await student.save();

    res.json({ message: 'Task assigned successfully', newTask });
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}


module.exports = { loginAdmin, addStudent, assignTask };
