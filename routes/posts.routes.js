const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');

router.post('/add', postsController.add);
router.post('/add-comment/:postId', postsController.addComment)
router.all('/fetch', postsController.fetchAll);
router.post('/fileTest', postsController.fileTest);
router.get('/delete/:postId', postsController.delete);

// Keep this route in the end.
router.get('/:postId', postsController.displayPost);

module.exports = router;