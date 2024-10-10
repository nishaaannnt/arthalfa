const express=require('express');
const userAuthController = require('../controllers/auth.controller')
const router=express.Router();

// out of scope but made a skeleton

router.post('/user/login',userAuthController.login);

// signup
router.post('/seller/signup',userAuthController.signup);
router.post('/user/signup',userAuthController.signup);


module.exports= router;


