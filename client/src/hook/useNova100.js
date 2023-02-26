import React, {useEffect, useState} from 'react'
import {BLE} from 'conx_client_api'
import config from '../config'


const UUID = {
  read: config.Nova100.READ,
  write: config.Nova100.WRITE,
  service: config.Nova100.SERVICE,
}

const ble = new BLE({
  deviceName: 'SmartLight',
  uuid: UUID.service,
})


export default function useNova100() {
  const [connected, setConnected] = useState(false)
  const [transmitting, settransmitting] = useState(false)
  const [readChannel, setReadChannel] = useState()
  const [writeChannel, setWriteChannel] = useState()

  let service


  async function connect() {
    try {    
      service = await ble.connect()
      
      setConnected(true)

      const newReadChannel = await ble.characteristic(UUID.read)
      const newWriteChannel = await ble.characteristic(UUID.write)
      
      setReadChannel(newReadChannel)
      setWriteChannel(newWriteChannel)
      
      settransmitting(true)
      
      console.log(`Nova100 BLE connected`)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    console.log('NOVA100 CHANNELS', readChannel, writeChannel)
  }, [readChannel, writeChannel])
  
  
  return {
    connect,
    connected,
    transmitting,
    readChannel,
    writeChannel,
  }
}