import {useEffect, useState} from 'react'


export default function useBluetooth() {
  const [connected, setConnected] = useState(false)
  const [device, setDevice] = useState()
  const [server, setServer] = useState()
  const [service, setService] = useState()
  const [serviceUUID, setServiceUUID] = useState('')
  const [state, setState] = useState()


  /**
   * 
   * @param {HEX} uuid 
   * @returns BLE Characteristic
   * 
   * characteristic.writeValue(Uint8Array.of('Message'))
   * characteristic.readValue()
   * await characteristic.startNotifications
   * characteristic.addEventListener('characteristicvaluechanged', handleNotifications)
   */
  const characteristic = async(uuid)=>{
    try {
      let characteristic = await service.getCharacteristic(uuid)
      
      return characteristic
    } catch (error) {
      console.error(error)

      setConnected(false)
    }
  }


  const connect = async({deviceName, uuid})=>{
    try {
      const filters = []
      let options = {}

      if (deviceName) filters.push({name: deviceName})

      setServiceUUID(uuid)

      options.filters = filters


      if (uuid) options.optionalServices = [uuid]

      if (!deviceName && !serviceUUID) filters.push({acceptAllDevices: true})


      const newDevice = await navigator.bluetooth.requestDevice(options)
      
      setDevice(newDevice)
    } catch (error) {
      console.error('connect BT', error)
    }
  }


  useEffect(() => {
    device?.gatt?.connect()
    .then(newServer=>{
      setServer(newServer)
    })
  }, [device])


  useEffect(() => {
    server?.getPrimaryService(serviceUUID)
    .then(newService=>{
      setService(newService)

      setConnected(true)
    })
  }, [server])

  
  return {
    connect,
    connected,
    device,
    characteristic,
    server,
    state,
  }
}