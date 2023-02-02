const express = require('express');
const router = express.Router();

const userController = require('../controller/Usercontroller')

router.post('/login', userController.login)
router.post('/signup', userController.Signup)
router.put('/updateuser', userController.updateUser)

module.exports = router;