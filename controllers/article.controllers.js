const uuid = require('uuid');
const path = require('path');
const { Article } = require('../models/models');
const ApiError = require('../error/ApiError');

class articleControllers {
    // Необходимая информация для создания статьи- title, text, author, category(VUE, JS, REACT, ANGULAR)
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
    }

    // В params надо передать id статьи
    async getArticle(req, res) {
        const { id } = req.params
        const article = await Article.findOne({ where: { id } })
        return res.json(article)
    }
    
    // В params надо передать id статьи, а всю прочую информация- в body (title, text, author, category(VUE, JS, REACT, ANGULAR))
    async patchArticle(req, res) {
        const { id } = req.params
        const { title, text, author, category} = req.body
        const article = await Article.update({ title, text, author, category }, { where: { id } })
        return res.json('Статья обновлена')
    }

    // В params надо передать id статьи
    async deleteArticle(req, res) {
        const { id } = req.params
        const article = await Article.destroy({ where: { id } })
        return res.json('Статья удалена')
    }
}

module.exports = new articleControllers();



