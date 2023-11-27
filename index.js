const express = require('express')
const { sequelize } = require('./server.js')
const app = express()
const port = 3000

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use(require('./routes/index.js'))

app.listen(port, () => {
  console.log(`Сервер запущен`)
})
