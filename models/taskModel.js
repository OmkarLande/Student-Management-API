const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,
  dueTime: Date,
  status: {
    type: String,
    enum: ['pending', 'overdue', 'completed'],
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
