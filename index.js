const express = require('express')
const { sequelize } = require('./server.js')
const app = express()
const cors = require('cors')
const port = 3000
const models = require('./models/models.js')

app.use(cors())

const start = (async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, () => console.log(`Сервер запущен`))
  } catch (e) {
    console.log(e)
  }
})()

app.get('/', (req, res) => {
  res.json('Hello World!')
})

app.use(express.json())
app.use(require('./routes/index.js'))


