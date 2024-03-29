const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');


router.get('/', shopController.homepage);
// router.get('/about', customerController.about);
// router.get('/add', customerController.addCustomer);
 router.post('/', shopController.postNewsletter);
// router.get('/view/:id', customerController.view);
// router.get('/edit/:id', customerController.edit);
// router.put('/edit/:id', customerController.editPost);
// router.delete('/edit/:id', customerController.deleteCustomer);
// router.post('/search', customerController.searchCustomers);



module.exports = router;