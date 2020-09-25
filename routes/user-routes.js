const express = require('express');
const { check }  = require('express-validator');
const checkAuth = require('../middleware/check-auth');

const usersControllers =require('../controllers/users-controller')
const router = express.Router();

router.post('/signup',[
    check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({min:6})
],usersControllers.signup)

router.post('/login',[
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({min:6})
  ],usersControllers.login)
router.post('/tokenIsValid',usersControllers.tokenIsValid)

router.use(checkAuth);
router.get('/',usersControllers.getUser)

module.exports = router;