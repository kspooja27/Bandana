const express = require('express');
const router = express.Router();
const rootController = require('../controllers/root.controller');

router.get('/join', rootController.register);
router.get('/login',rootController.login);
router.get('/feed',rootController.feed);
router.get('/logout',rootController.logout);

module.exports = router;