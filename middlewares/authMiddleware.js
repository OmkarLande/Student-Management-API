const Student = require("../models/studentModel");

function authenticateAdmin(req, res, next) {
  const adminCredentialsHeader = req.headers.admincredentials;

  if (!adminCredentialsHeader) {
    return res
      .status(400)
      .json({ error: "Admin credentials not provided in headers" });
  }

  const [email, password] = adminCredentialsHeader.split(":");

  if (!email || !password) {
    return res.status(400).json({ error: "Invalid Credentials in headers" });
  }

  if (email === "admin@admin.com" && password === "admin") {
    req.isAdmin = true;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

async function authenticateStudent(req, res, next) {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(301).json({ message: "Invalid Creadentials" });
  }
  try {
    let student = await Student.findOne({ email, password });

    if (!student) {
      const { name, department } = req.body;
      student = new Student({ name, email, department, password });
      await student.save();
    }

    req.student = student;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { authenticateAdmin, authenticateStudent };
