const express = require('express'); //import express

const router = express.Router();
const auth=require('../middleware/auth');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/login',  authController.login);
router.post('/register', userController.create);
router.delete('/delete', auth,userController.delete);
router.patch('/edit',auth, userController.edit);

module.exports = router; // export to use in server.js
