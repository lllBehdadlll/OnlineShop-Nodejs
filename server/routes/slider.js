const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');


router.get('/', sliderController.homepage);
router.get('/add', sliderController.addSlider);
router.post('/add', sliderController.postSlider);
router.get('/view/:id', sliderController.view);
router.get('/edit/:id', sliderController.edit);
router.put('/edit/:id', sliderController.editPost);
router.delete('/edit/:id', sliderController.deleteSlider);
router.post('/search', sliderController.searchSliders);



module.exports = router;