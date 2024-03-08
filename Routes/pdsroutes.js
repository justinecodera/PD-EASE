const { Router } = require('express');
const pdsController = require('../Controllers/pdsController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

// router.get('/pds/:id', requireAuth, pdsController.pds_get);
// router.get('/generatePDS/:id', requireAuth, pdsController.printPDS_get);
router.get('/printPDS/:id', requireAuth, pdsController.printPDS_get);

// router.post('/printPDS', requireAuth, pdsController.printPDS_post);

module.exports = router;