const router = require("express").Router();
const Task = require("./model");

// GET: Tasks
router.get("/", async (req, res, next) => {
    try {
        const tasks = await Task.getTasks();
        return res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
});

// POST: Tasks
router.post("/", async (req, res) => {
    const { task_description, task_notes, task_completed, project_id } = req.body;

    // Validate input
    if (!task_description) {
        return res.status(400).json({ message: "Task description is required" });
    }
    if (!project_id) {
        return res.status(400).json({ message: "Project ID is required" });
    }

    try {
        const newTask = await Task.addTask({
            task_description,
            task_notes: task_notes || null, // Default to null if not provided
            task_completed: task_completed === undefined ? false : task_completed, // Default to false
            project_id,
        });
        return res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: "Error adding task to the database" });
    }
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the Task router",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
