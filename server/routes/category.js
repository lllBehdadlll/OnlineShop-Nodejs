const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.get('/', categoryController.homepage);
router.get('/add', categoryController.addCategory);
router.post('/add', categoryController.postCategory);
router.get('/view/:id', categoryController.view);
router.get('/edit/:id', categoryController.edit);
router.put('/edit/:id', categoryController.editPost);
router.delete('/edit/:id', categoryController.deleteCategory);
router.post('/search', categoryController.searchCategory);



module.exports = router;