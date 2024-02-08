const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');


router.get('/', newsletterController.homepage);
router.get('/view/:id', newsletterController.view);
router.delete('/edit/:id', newsletterController.deleteNewsletter);
router.post('/search', newsletterController.searchNewsletter);



module.exports = router;