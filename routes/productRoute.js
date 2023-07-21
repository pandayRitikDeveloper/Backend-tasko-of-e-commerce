const express = require('express'); //import express
const router = express.Router();
const expenseController = require('../controllers/productController');
const auth=require('../middleware/auth');
router.post(
  '/addProduct/',
  auth,
  expenseController.create
);
router.get('/Allproducts/', auth,expenseController.getAll);
router.delete('/productDelete/:id',auth, expenseController.productDelete);
router.patch('/productUpdate/:id',auth, expenseController.productUpdate);

module.exports = router;
