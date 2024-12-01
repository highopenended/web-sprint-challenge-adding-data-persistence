const router = require("express").Router();
const Resource = require('./model')

// GET: Resources
router.get('/', async (req,res,next)=>{
    try{
        const resources = await Resource.getResources()
        return res.status(200).json(resources)
    }catch(err){
        next(err)
    }
})

// POST: Resources
router.post('/', async (req, res) => {
    const { resource_name, resource_description } = req.body;
  
    if (!resource_name) {
      return res.status(400).json({ message: 'Resource name is required' });
    }
  
    try {
      const newResource = await Resource.addResource({
        resource_name,
        resource_description: resource_description || null,
      });
      return res.status(201).json(newResource);
    } catch (err) {
      res.status(500).json({ message: 'Error adding resource to the database' });
    }
});


router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the Resource router",
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;