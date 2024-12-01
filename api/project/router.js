const router = require("express").Router();
const Project = require('./model')

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the Project router",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;