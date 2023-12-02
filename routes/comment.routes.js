const Router = require('express');
const commentControllers = require('../controllers/comment.controllers');
const router = new Router();

router.get('/', commentControllers.getAllComments)
router.post('/', commentControllers.postComment)
router.delete('/:id', commentControllers.deleteComment)



module.exports = router;