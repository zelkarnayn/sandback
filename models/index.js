const Sequelize = require('sequelize');
const { sequelize } = require('../server');


const Todo = sequelize.define('todo', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    discription: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

Todo.sync().then(() => {
    console.log('Todo table created');
});

module.exports = Todo;