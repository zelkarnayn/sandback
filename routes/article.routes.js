const Router = require('express');
const articleControllers = require('../controllers/article.controllers');
const router = new Router();

router.get('/:article_id', articleControllers.getArticle)
router.get('/', articleControllers.getAllArticles)
router.post('/', articleControllers.postArticle)
router.delete('/:article_id', articleControllers.deleteArticle)
router.patch('/update/:article_id', articleControllers.patchArticle)
router.patch('/like/:article_id', articleControllers.likeArticle)
router.patch('/favorite/:article_id', articleControllers.makeFavorite)

module.exports = router;