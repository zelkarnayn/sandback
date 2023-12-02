const Router = require('express');
const userControllers = require('../controllers/user.controllers');
const router = new Router();

router.get('/:id', userControllers.getUser)
router.get('/', userControllers.getAllUser)
router.post('/', userControllers.postUser)
router.delete('/:id', userControllers.deleteUser)

module.exports = router;