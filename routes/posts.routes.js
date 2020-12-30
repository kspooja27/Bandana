const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

router.post('/add', postsController.add);
router.post('/add-comment/:postId', postsController.addComment)
router.all('/fetch', postsController.fetchAll);
router.post('/fileTest', postsController.fileTest);

module.exports = router;