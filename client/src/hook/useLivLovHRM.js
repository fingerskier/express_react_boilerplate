import React, {useEffect, useState} from 'react'
import {BLE} from 'conx_client_api'
import config from '../config'

const UUID = {
  channel: config.LivLovHRM.HeartRate.READ,
  service: config.LivLovHRM.HeartRate.SERVICE,
}

const ble = new BLE({
  // deviceName: 'SmartLight',
  // deviceNamePrefix: 'LIVLOV',
  uuid: UUID.service,
})


export default function useLivLovHRM() {
  const [connected, setConnected] = useState(false)
  const [transmitting, settransmitting] = useState(false)
  const [channel, setChannel] = useState()

  let service


  async function connect() {
    try {
      service = await ble.connect()

      setConnected(true)

      const newCh = await ble.characteristic(UUID.channel)

      setChannel(newCh)

      settransmitting(true)

      console.log(`LivLovHRM BLE connected`)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    console.log(channel)
  }, [channel])
  
  
  return {
    connect,
    connected,
    transmitting,
    channel: channel,
  }
}