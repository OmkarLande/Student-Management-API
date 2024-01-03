const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    default: 'admin@admin.com',
  },
  password: {
    type: String,
    default: 'admin',
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
