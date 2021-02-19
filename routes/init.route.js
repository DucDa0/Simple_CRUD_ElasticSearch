const express = require('express');
const router = express.Router();
const {
  createIndex,
  addmappingToIndex,
} = require('../controllers/init.controller');

router.post('/create-index', createIndex);
router.post('/add-mapping', addmappingToIndex);

module.exports = router;
