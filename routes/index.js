const express = require("express");
const Todo = require("../models");


const router = express.Router();

router.post("/todos", async (req, res) => {
    const { title, discription } = req.body;
    console.log(title, discription);
    try {
        const todo = await Todo.create({title, discription})
        res.json(todo)
    } catch (error) {
        res.json({error: error.message})
    }
})
router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.findAll()
        res.json()
    } catch (error) {
        res.json({error: error.message})
    }
})
router.delete("/todos/:id", (req, res) => {})
router.patch("/todos/:id", (req, res) => {})

module.exports = router;