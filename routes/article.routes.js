const Router = require('express');
const articleControllers = require('../controllers/article.controllers');
const router = new Router();

router.get('/:id', articleControllers.getArticle)
router.get('/', articleControllers.getAllArticles)
router.post('/', articleControllers.postArticle)
router.patch('/:id', articleControllers.patchArticle)
router.delete('/:id', articleControllers.deleteArticle)

module.exports = router;