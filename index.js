const express = require('express')
const https = require('https')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const { sequelize } = require('./server.js')
const path = require('path')
const app = express()
const cors = require('cors')
const port = 3000
const models = require('./models/models.js')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middleware/ErrorHandlingMiddleware.js')

app.use(cors({
  credentials: true,
  origin: ['http://localhost:5174'],
  
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(require('./routes/index.routes.js'))

// Обработка ошибок
app.use(errorMiddleware)

const start = (async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    const httpsServer = https.createServer({
      key: fs.readFileSync('/etc/letsencrypt/live/back.sandbook.ru/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/back.sandbook.ru/fullchain.pem')
    }, app)

    httpsServer.listen(port, () => {
      console.log('HTTPS Server running on port 443')
    })
  } catch (e) {
    console.log(e)
  }
})()




