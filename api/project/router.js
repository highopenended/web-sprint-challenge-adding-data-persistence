const router = require("express").Router();
const Project = require("./model");

// GET: Projects
router.get("/", async (req, res, next) => {
    try {
        const projects = await Project.getProjects();
        return res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
});

// POST: Projects
router.post("/", async (req, res) => {
    const { project_name, project_description, project_completed } = req.body;
    if (!project_name) {
        return res.status(400).json({ message: "Project name is required" });
    }
    try {
        const newProject = await Project.addProject({
            project_name,
            project_description: project_description,
            project_completed:project_completed,
        });
        return res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: "Error adding project to the database" });
    }
});

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the Project router",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
