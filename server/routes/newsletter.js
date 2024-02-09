const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');


router.get('/', newsletterController.homepage);
router.get('/view/:id', newsletterController.view);
router.delete('/edit/:id', newsletterController.deleteNewsletter);
router.post('/search', newsletterController.searchNewsletter);
router.get('/sendtoall', newsletterController.sendtoall);
router.post('/sendtoall', newsletterController.postSendtoall);



module.exports = router;