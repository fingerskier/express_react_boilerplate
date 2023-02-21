var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next)=>{
  const {SerialPort} = require('serialport')

  const list = await SerialPort.list()

  res.json(list)
});

module.exports = router;
