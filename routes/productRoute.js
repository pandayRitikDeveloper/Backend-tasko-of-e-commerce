const express = require('express'); //import express

const router = express.Router();
const expenseController = require('../controllers/productController');
const joi_validation = require('../services/joi_validation');
const auth=require('../middleware/auth');
router.post(
  '/addProduct',auth,
  joi_validation.createExpenseValidation,
  expenseController.create
);
router.get('/seachItem', expenseController.seachItem);
router.delete('/productDelete/:id', auth,expenseController.productDelete);
router.patch('/productUpdate/:id', auth,expenseController.productUpdate);

module.exports = router;
