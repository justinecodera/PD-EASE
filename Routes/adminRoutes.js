const { Router } = require('express');
const adminController = require('../Controllers/adminController');
const { requireAuthAdmin, checkAdmin } = require('../middleware/authMiddleware');

const router = Router();
router.get('/admin',requireAuthAdmin, checkAdmin, adminController.admin_get);
router.get('/loginAdmin', adminController.loginAdmin_get);
router.get('/adminlogout', adminController.logout_get);

router.get('/newadmin',requireAuthAdmin,checkAdmin,  adminController.newadmin_get);
router.post('/adminsignup',requireAuthAdmin, checkAdmin,  adminController.adminsignup_post);

router.get('/adminUsers',requireAuthAdmin,checkAdmin,  adminController.adminUsers_get);
router.get('/userProfile/:id',requireAuthAdmin,checkAdmin,  adminController.userProfile_get);
router.get('/adminProfile/:id',requireAuthAdmin,checkAdmin,  adminController.adminProfile_get);
router.get('/userProfile/downloaduserPDS/:id',requireAuthAdmin,checkAdmin,  adminController.downloadPDS_get);

router.get('/pdssettings',requireAuthAdmin,checkAdmin,  adminController.pdssettings_get);
router.post('/updatepdssettings',requireAuthAdmin,checkAdmin,  adminController.pdssettings_post);

router.post('/updateuserprofile',requireAuthAdmin, checkAdmin,  adminController.updateuserprofile_post);
router.post('/updateadminprofile',requireAuthAdmin, checkAdmin,  adminController.updateadminprofile_post);
router.post('/updateuserrestriction',requireAuthAdmin, checkAdmin,  adminController.updateuserrestriction_post);
router.get('/deleteuser/:id',requireAuthAdmin, checkAdmin,  adminController.deleteuser_delete)


router.get('/logs',requireAuthAdmin, checkAdmin, adminController.logs_get);
module.exports = router;