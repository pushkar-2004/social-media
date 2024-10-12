const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/signup',authController.signupController);
router.post('/login',authController.loginController);
router.post("/refresh",authController.refreshAccessTokenroller);

module.exports = router; 