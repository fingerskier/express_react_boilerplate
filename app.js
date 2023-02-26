const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const dataRouter = require('./routes/data')
const indexRouter = require('./routes/index')
const serialRouter = require('./routes/serial.js')
const usersRouter = require('./routes/users')

const app = express()


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/app', express.static('app'))


const expressWS = require('express-ws')(app)


app.ws('/data/:key', dataRouter)

app.use('/', indexRouter)
app.use('/serial', serialRouter)
app.use('/users', usersRouter)


module.exports = app