import React, {useEffect, useState} from 'react'
import {BLE} from 'conx_client_api'
import config from '../config'


const UUID = {
  relay0: config.SmartLight.RELAY0,
  relay1: config.SmartLight.RELAY1,
  relay2: config.SmartLight.RELAY2,
  relay3: config.SmartLight.RELAY3,
  service: config.SmartLight.SERVICE,
}

const ble = new BLE({
  deviceName: 'SmartLight',
  uuid: UUID.service,
})


export default function SmartLight() {
  const [connected, setConnected] = useState(false)
  const [transmitting, settransmitting] = useState(false)
  const [relay0, setRelay0] = useState()
  const [relay1, setRelay1] = useState()
  const [relay2, setRelay2] = useState()
  const [relay3, setRelay3] = useState()

  let service
  

  async function connect() {
    try {    
      service = await ble.connect()
      
      setConnected(true)

      const newR0 = await ble.characteristic(UUID.relay0)
      const newR1 = await ble.characteristic(UUID.relay1)
      const newR2 = await ble.characteristic(UUID.relay2)
      const newR3 = await ble.characteristic(UUID.relay3)
      
      setRelay0(newR0)
      setRelay1(newR1)
      setRelay2(newR2)
      setRelay3(newR3)
      
      settransmitting(true)
      
      console.log(`SmartLight BLE connected`)
    } catch (error) {
      console.error(error)
    }
  }


  return {
    connect,
    connected,
    transmitting,
    relay0,
    relay1,
    relay2,
    relay3,
  }
}