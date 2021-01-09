const express = require('express');
const router = express.Router();
const rootController = require('../controllers/root.controller');

router.get('/join', rootController.register);

module.exports = router;