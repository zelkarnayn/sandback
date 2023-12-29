const { Comment, LikesComment} = require("../models/models");

class commentController {
    // В params надо передать id статьи
    async getAllComments(req, res) {
        try {
            const { article_id } = req.params;
            const comments = await Comment.findAll({ where: { article: article_id } });
            res.status(200).json(comments);
        } catch (e) {
            return res.json(e)
        }
    }

    // В params надо передать id статьи, а всю прочую информация- в body (text, author(его id))
    async postComment(req, res) {
        try {
            const { text, author } = req.body;
            const { article_id } = req.params;
            const comment = await Comment.create({ text, author, article: article_id });
            res.status(200).json(comment);
        } catch (e) {
            return res.json(e)
        }
    }

    // В params надо передать id комментария
    async deleteComment(req, res) {
        try {
            const { comment_id } = req.params;
            const comment = await Comment.destroy({ where: { comment_id } });
            res.status(200).json(comment);
        } catch (e) {
            return res.json(e)
        }
    }

    // В params надо передать id комментария
    async likeComment(req, res) {
        try {
            const { comment_id } = req.params
            const { user_id } = req.body
            const comment = await LikesComment.create({user_id, comment_id})
            return res.json(comment)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new commentController();