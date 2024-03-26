const { Router } = require('express');
const adminController = require('../Controllers/adminController');
const { requireAuthAdmin, checkAdmin } = require('../middleware/authMiddleware');

const router = Router();
router.get('/admin',requireAuthAdmin, checkAdmin, adminController.admin_get);
router.get('/loginAdmin', adminController.loginAdmin_get);

router.get('/newadmin',requireAuthAdmin,checkAdmin,  adminController.newadmin_get);
router.post('/adminsignup',requireAuthAdmin, checkAdmin,  adminController.adminsignup_post);

router.get('/adminUsers',requireAuthAdmin,checkAdmin,  adminController.adminUsers_get);
router.get('/userProfile/:id',requireAuthAdmin,checkAdmin,  adminController.userProfile_get);

module.exports = router;