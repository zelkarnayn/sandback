const { Comment } = require("../models/models");

class commentController {
    // В params надо передать id статьи
    async getAllComments(req, res) {
        const { id } = req.params;
        const comments = await Comment.findAll({ where: { article: id } });
        res.status(200).json(comments);
    }

    // В params надо передать id статьи, а всю прочую информация- в body (text, author(его id))
    async postComment(req, res) {
        const { text, author } = req.body;
        const { id } = req.params;
        const comment = await Comment.create({ text, author, article: id });
        res.status(200).json(comment);
    }

    // В params надо передать id комментария
    async deleteComment(req, res) {
        const { id } = req.params;
        const comment = await Comment.destroy({ where: { id } });
        res.status(200).json(comment);
    }
}

module.exports = new commentController();