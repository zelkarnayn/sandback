const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

module.exports.sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)