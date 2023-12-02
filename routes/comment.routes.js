const Router = require('express');
const commentControllers = require('../controllers/comment.controllers');
const router = new Router();

router.get('/:id', commentControllers.getAllComments)
router.post('/:id', commentControllers.postComment)
router.delete('/:id', commentControllers.deleteComment)



module.exports = router;