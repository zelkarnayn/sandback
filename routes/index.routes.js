const Router = require('express')
const router = new Router()
const userRouter = require('./user.routes')
const articleRouter = require('./article.routes')
const commentRouter = require('./comment.routes')

router.use('/user', userRouter)
router.use('/article', articleRouter)
router.use('/comment', commentRouter)

module.exports = router;