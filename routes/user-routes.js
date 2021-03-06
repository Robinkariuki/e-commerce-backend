const express = require('express');
const { check }  = require('express-validator');
const auth = require('../middleware/check-auth');

const usersControllers =require('../controllers/users-controller')
const router = express.Router();

router.post('/signup',usersControllers.signup)

router.post('/login',[
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({min:6})
  ],usersControllers.login)
router.post('/tokenIsValid',usersControllers.tokenIsValid)


router.get('/',auth,usersControllers.getUser)

module.exports = router;