const jwt = require('jsonwebtoken');
const express =require('express')
const {generateToken}=require('../service/authServices');
const { route } = require('./profile.routes');
const authController = require('../controller/auth.controller');
const router = express.Router()

router.post('/login',authController.login);
router.post('/register',authController.registerUser);


//Middleware->
// Apply middleware
router.use(authController.authMiddleware);

// Define routes
router.get('/me', authController.getCurrentUser);
router.get('/users', authController.authorizationMiddleware(['admin']), authController.getAllUser); 
router.put('/edit/:id', authController.authorizationMiddleware(['admin']), authController.editUser); 
router.delete('/delete/:id', authController.authorizationMiddleware(['admin']), authController.deleteUser);

module.exports=router;