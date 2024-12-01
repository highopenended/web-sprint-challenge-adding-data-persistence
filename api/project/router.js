const router = require("express").Router();
const Project = require('./model')

router.get('/', (req,res)=>{
    return res.status(200).json({
        message:"Getting Projects"
    })
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the Project router",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;