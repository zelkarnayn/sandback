const userControllers = require('../controllers/user.controllers');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const router = require('express').Router();


router.post('/registration', body('email').isEmail(), body('password').isLength({min: 6, max: 32}), userControllers.registration)
router.post('/login', userControllers.login)
router.post('/logout', userControllers.logout)
router.get('/activate/:link', userControllers.activate)
router.get('/refresh', userControllers.refresh)
router.get('/users', authMiddleware, userControllers.getUsers)

module.exports = router;