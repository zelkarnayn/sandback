const uuid = require('uuid');
const path = require('path');
const { Article, LikesArticle, FavoriteArticle} = require('../models/models');
const ApiError = require('../error/ApiError');

class articleControllers {
    // Необходимая информация для создания статьи- title, text, author, image, category(VUE, JS, REACT, ANGULAR, TS)
    async postArticle(req, res, next) {
        try {
            const { title, text, author, category } = req.body;
            const { image } = req.files;
            let fileName = uuid.v4() + '.jpg';
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const article = await Article.create({
                title,
                text,
                author,
                category,
                image: fileName
            })
            return res.json(article)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    // Для получения статей определенного автора используется ключ author, для категории- category
    // Для указания лимита и номера страницы указываются limiy & page (пагинация)
    // Все параметры передаются в query
    async getAllArticles(req, res) {
        try {
            let { author, category, limit, page } = req.query
            page = page || 1
            limit = limit || 3
            let offset = page * limit - limit
            let articles;
            if (!author && !category) {
                articles = await Article.findAndCountAll({ limit, offset })
            }
            if (author && !category) {
                articles = await Article.findAndCountAll({ where: { author }, limit, offset })
            }
            if (!author && category) {
                articles = await Article.findAndCountAll({ where: { category }, limit, offset })
            }
            if (author && category) {
                articles = await Article.findAndCountAll({ where: { category, author }, limit, offset })
            }
            return res.json(articles)
        } catch (e) {
            return res.json(e)
        }
    }

    // В params надо передать id статьи
    async getArticle(req, res) {
        try {
            const { article_id } = req.params
            const article = await Article.findOne({ where: { article_id } })
            return res.json(article)
        } catch (e) {
            return res.json(e)
        }
    }
    
    // В params надо передать id статьи, а всю прочую информация- в body (title, text, author, category(VUE, JS, REACT, ANGULAR))
    async patchArticle(req, res) {
        try {
            const { article_id } = req.params
            const { title, text, author, category} = req.body
            const article = await Article.update({ title, text, author, category }, { where: { article_id } })
            return res.json(article)
        } catch (e) {
            return res.json(e)
        }
    }

    // В params надо передать id статьи
    async deleteArticle(req, res) {
        try {
            const { article_id } = req.params
            const article = await Article.destroy({ where: { article_id } })
            return res.json(article)
        } catch (e) {
            return res.json(e)
        }
    }

    // В params надо передать id статьи, а в body передать id юзера и статус лайка
    async likeArticle(req, res) {
        const { article_id } = req.params
        const { user_id, like } = req.body
        const article = await LikesArticle.create({user_id, article_id, like})
        return res.json(article)
    }

    // В params надо передать id статьи, а в body передать id юзера
    async makeFavorite(req, res) {
        try {
            const { article_id } = req.params
            const { user_id } = req.body
            const favoriteArticle = await FavoriteArticle.create({user_id, article_id})
            return res.json(favoriteArticle)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new articleControllers();



