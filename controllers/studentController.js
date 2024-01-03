const Student = require("../models/studentModel");
const Task = require("../models/taskModel");

async function loginStudent(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }

    try {
        const existingStudent = await Student.findOne({ email, password }).populate(
            "tasks"
        );

        if (existingStudent) {
            return res.json({
                message: "Student logged in successfully",
                existingStudent,
            });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getTasksByStudentId(req, res) {
    const studentId = req.params.studentId;

    if (!studentId) {
        return res.status(400).json({ error: "Invalid student ID provided" });
    }

    try {
        const student = await Student.findById(studentId).populate("tasks");

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ tasks: student.tasks || [] });
    } catch (error) {
        console.error("Error fetching tasks by student ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateTaskStatusById(req, res) {
    const { taskId, newStatus } = req.body;

    if (!taskId || !newStatus) {
        return res
            .status(400)
            .json({ error: "Invalid task ID or new status provided" });
    }

    try {
        const task = await Task.findByIdAndUpdate(
            taskId,
            { $set: { status: newStatus } },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({
            message: "Task status updated successfully",
            updatedTask: task,
        });
    } catch (error) {
        console.error("Error updating task status by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function seeStatus(req, res) {
    const taskId = req.params.taskId;

    if (!taskId) {
        return res.status(400).json({ error: "Invalid task ID provided" });
    }

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ status: task.status });
    } catch (error) {
        console.error("Error fetching task status by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    loginStudent,
    getTasksByStudentId,
    updateTaskStatusById,
    seeStatus,
};
