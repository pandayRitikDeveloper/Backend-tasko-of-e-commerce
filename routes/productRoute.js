const express = require('express'); //import express

const router = express.Router();
const expenseController = require('../controllers/productController');
const joi_validation = require('../services/joi_validation');

router.post(
  '/addProduct',
  joi_validation.createExpenseValidation,
  expenseController.create
);
router.get('/seachItem', expenseController.seachItem);
router.delete('/productDelete/:id', expenseController.productDelete);
router.patch('/productUpdate/:id', expenseController.productUpdate);

module.exports = router;
