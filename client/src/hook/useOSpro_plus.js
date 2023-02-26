import React, {useEffect, useState} from 'react'
import {BLE} from 'conx_client_api'
import config from '../config'


const UUID = {
  read: config.OSproPlus.READ,
  write: config.OSproPlus.WRITE,
  service: config.OSproPlus.SERVICE,
}

const ble = new BLE({
  // deviceName: 'OsteoStroeng00',
  deviceNamePrefix: 'OsteoStro',
  uuid: UUID.service,
})


export default function() {
  const [connected, setConnected] = useState(false)
  const [transmitting, settransmitting] = useState(false)
  const [readChannel, setReadChannel] = useState()
  const [service, setService] = useState()
  const [writeChannel, setWriteChannel] = useState()


  async function connect() {
    try {    
      let serv = await ble.connect()

      setService(serv)
      
      console.log(`OSproPlus BLE SERVICE CONX`, serv)
      
      setConnected(serv.connected)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  useEffect(async() => {
    if (service) {

      
      const newReadChannel = await ble.characteristic(UUID.read)
      const newWriteChannel = await ble.characteristic(UUID.write)
      
      setReadChannel(newReadChannel)
      setWriteChannel(newWriteChannel)
      
      settransmitting(true)
      
      console.log(`OSproPlus BLE connected`)
    }
  }, [service])
  


  useEffect(() => {
    console.log('OSproPlus CHANNELS', readChannel, writeChannel)
  }, [readChannel, writeChannel])
  
  
  return {
    connect,
    connected,
    transmitting,
    readChannel,
    writeChannel,
  }
}