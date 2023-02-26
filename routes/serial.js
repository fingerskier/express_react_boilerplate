const express = require('express')
const router = express.Router()


router.get('/', async(req, res, next)=>{
  const {SerialPort} = require('serialport')

  const list = await SerialPort.list()

  res.json(list)
})


module.exports = router