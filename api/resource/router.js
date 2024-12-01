const router = require("express").Router();
const Resource = require('./model')

router.get('/', (req,res)=>{
    return res.status(200).json({
        message:"Getting Resources"
    })
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the Resource router",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;