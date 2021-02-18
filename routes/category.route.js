const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  edit,
  remove,
  search,
} = require('../controllers/category.controller');

router.get('/', getAll);
// router.get('/:id', getById);
router.get('/search', search);
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;
