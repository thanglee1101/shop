const express = require('express');
const router = express.Router();
const { authByToken } = require('../middleware/auth')
const userController = require('../controller/Usercontroller')

router.post('/login', userController.login)
router.post('/signup', userController.Signup)
router.put('/update', authByToken, userController.updateUser)
module.exports = router;








