import React, {useEffect, useState} from 'react'
import {BLE} from 'conx_client_api'
import config from '../config'


const UUID = {
  relay0: config.SmartPlug.RELAY0,
  service: config.SmartPlug.SERVICE,
}

const ble = new BLE({
  deviceName: 'Smart-Plug',
  uuid: UUID.service,
})


export default function() {
  const [connected, setConnected] = useState(false)
  const [transmitting, settransmitting] = useState(false)
  const [relay0, setRelay0] = useState()

  let service
  

  async function connect() {
    try {    
      service = await ble.connect()
      
      setConnected(true)

      const newR0 = await ble.characteristic(UUID.relay0)
      
      setRelay0(newR0)
      
      settransmitting(true)
      
      console.log(`SmartPlug BLE connected`)
    } catch (error) {
      console.error(error)
    }
  }


  return {
    connect,
    connected,
    transmitting,
    relay0,
  }
}