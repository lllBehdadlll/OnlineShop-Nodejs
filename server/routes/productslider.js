const express = require('express');
const router = express.Router();
const productsliderController = require('../controllers/productsliderController');


router.get('/', productsliderController.homepage);
router.get('/add', productsliderController.addProductslider);
router.post('/add', productsliderController.postProductslider);
router.get('/view/:id', productsliderController.view);
router.get('/edit/:id', productsliderController.edit);
router.put('/edit/:id', productsliderController.editPost);
router.delete('/edit/:id', productsliderController.deleteProductslider);
router.post('/search', productsliderController.searchProductslider);



module.exports = router;