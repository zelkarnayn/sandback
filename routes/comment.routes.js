const Router = require('express');
const commentControllers = require('../controllers/comment.controllers');
const router = new Router();

router.get('/:article_id', commentControllers.getAllComments)
router.post('/:article_id', commentControllers.postComment)
router.delete('/:comment_id', commentControllers.deleteComment)
router.patch('/:comment_id', commentControllers.likeComment)



module.exports = router;