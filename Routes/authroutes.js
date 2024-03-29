const { Router } = require('express');
const authController = require('../Controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();


router.get('/sendotp/:id', requireAuth, authController.sendOTP_get);
router.get('/verifyotp/:id', requireAuth,  authController.verifyOTP_get);
router.post('/verifyotp', requireAuth,  authController.verifyOTP_post);

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);


module.exports = router;