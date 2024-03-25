const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagAll = await Tag.findAll ({
      include: [{ model: Product}]
    });
    res.status(200).json(tagAll);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find a single tag by its `id`
// be sure to include its associated Product data

router.get('/:id', async (req, res) => {
  try{
    const tagOne = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    });

    if(!tagOne) {
      res.status(404).json ({ message: 'No match found'});
      return;
    }

    res.status(200).json(tagOne);
  } catch (err) {
    res.status(500).json({ error:err.message});
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagPost = await Tag.create(req.body);
    res.status(200).json(tagPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const tagPut = await Tag.update(req.body, {
      where: {id: req.params.id}
    });
    if (tagPut[0] === 0) {
      return res.status(404).json({message:'Can not Find That Tag!'});
    }
    
    res.status(200).json({ message: 'Great Success! Tag Updated!'});
  }catch (error) {
    res.status(500).json({ error: error.message});
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
 try {
   const tagDelete = await Tag.destroy ({
    where: { id: req.params.id }
  });

  if(tagDelete === 0) {
    res.status(404).json({ message: 'Can not Find That Tag!'});
    return;
  }

  res.status(200).json({message: 'Great Success! Tag Deleted!'});
} catch (err) {
  console.error(err);

}
});

module.exports = router;
