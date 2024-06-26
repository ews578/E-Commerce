const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    })
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(err);

    
  }
  
});
// find one category by its `id` value
// be sure to include its associated Products

router.get('/:id',async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include:[{model: Product}]
    });

    if (!categoryData) {
      res.status(404).json({message:"Category not found"});
      return;
    } 
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json.apply(err);
    
  }
});
// create a new category

router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
      res.status(201).json(categoryData);
  
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(error => error.message);
        res.status(400).json({ errors });
      } else {
        res.status(500).json({ error: 'Failed to create category' });
      }
    }
  });
  // update a category by its `id` value

router.put('/:id', async (req, res) => {
  
    try {
      const updatedCategory = await Category.update(req.body,{
     where: {id: req.params.id}
      }); 
        if (updatedCategory[0] === 0) {
        
        return res.status(404).json({ message: "Category not found" });
        } 
          res.status(200).json({ message: 'Category Updated' });
        } catch (error) {
          res.status(500).json({error:error.message})
        }
      });

      // delete a category by its `id` value
      router.delete('/:id', async (req, res) => {
        try {
          const deletedRows = await Category.destroy({
            where: { id: req.params.id }
          });
      
          if (deletedRows === 0) {
            res.status(404).json({ message: 'Category ID not found' });
            return;
          }
      
          res.status(200).json({ message: 'Category deleted' });
        } catch (err) {
          console.error(err);
      
          res.status(500).json(err);
        }
      });
      

module.exports = router;
//destroy where statement in update, include :[{model: category}, {model: tag}] 