const express = require("express");
const router = express.Router();
const musicianController = require("../controllers/musician.controller") ;

router.post('/register', musicianController.register);
router.post('/login', musicianController.login);
router.post('/fetch', musicianController.fetchAll);
router.get('/changePassword',musicianController.changePassword);
router.post('/changePassword',musicianController.changePasswordPost);

module.exports = router;

