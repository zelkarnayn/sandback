const express = require("express");
const { Article, Comment, User } = require("../models/models");

const router = express.Router();

router.post("/articles", async (req, res) => {
    const { title, text, author } = req.body;
    try {
        const article = await Article.create({ title, text, author })
        res.json(article)
    } catch (error) {
        res.json({ error: error.message })
    }
})
router.get("/articles", async (req, res) => {
    try {
        const articles = await Article.findAll()
        res.json(articles)
    } catch (error) {
        res.json({ error: error.message })
    }
})
router.delete("/articles/:id", (req, res) => { })
router.patch("/articles/:id", (req, res) => { })

module.exports = router;