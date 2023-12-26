const express = require('express')
const https = require('https')
const http = require('http')
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


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
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
    const httpServer = http.createServer(app)
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