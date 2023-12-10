const Router = require('express')
const router = new Router()
const articleRouter = require('./article.routes')
const commentRouter = require('./comment.routes')
const userRouter = require('./user.routes')

router.use('/user', userRouter)
router.use('/article', articleRouter)
router.use('/comment', commentRouter)

module.exports = router;