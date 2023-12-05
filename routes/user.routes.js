const userControllers = require('../controllers/user.controllers');

const router = require('express').Router();


router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)
router.post('/logout', userControllers.logout)
router.get('/activate/:link', userControllers.activate)
router.get('/refresh', userControllers.refresh)
router.get('/users', userControllers.getUsers)

module.exports = router;