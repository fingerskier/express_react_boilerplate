import { useEffect, useState } from 'react'
import OSProPlus from '../lib/OSProPlus'
import SmartLight from '../lib/SmartLightDevice'
import useLocalStorage from '../hook/useLocalStorage'
import {DEVICE, STATUS} from '../constants'


export default function() {
  const [devices, setDevices] = useLocalStorage('cardinal-devices', [])
  const [status, setStatus] = useState('')
  
  let elapsed, timer
  let T = 123
  
  
  const connect = async(deviceType)=>{
    if (!window.cardinal_device) window.cardinal_device = {}

    let connectedDevice, deviceID

    console.log('CONNECT', deviceType)
    
    if (deviceType === 5) {
      connectedDevice = new OSProPlus()
      
      deviceID = await connectedDevice.initialize()
    } else if (deviceType === 3) {
      connectedDevice = new SmartLight()
      
      deviceID = await connectedDevice.initialize()
    }
    
    connectedDevice.type = deviceType
    
    window.cardinal_device[deviceID] = connectedDevice
    
    console.log('WIN DEVICES', window.cardinal_device)
    
    timer = setInterval(() => {
      if (connectedDevice.transmitting) {
        setStatus(STATUS.TRANSMITTING)
        console.log('device transmitting')
        clearInterval(timer)
      } else if (connectedDevice.connected) {
        setStatus(STATUS.CONNECTED)
      } else if (T > 60000) {
        connectedDevice.cancel()
        clearInterval(timer)
      }
      
      elapsed += T
    }, T)
    
    
    setDevices(Object.keys(window.cardinal_device).map(key=>{
      return window.cardinal_device[key]
    }))
  }
  
  
  const disconnect = async(index)=>{
    const thisDevice = devices[index]
    
    try {
      await thisDevice.disconnect()
    } catch (error) {
      console.error(error)
    }
    
    delete devices[index]
    
    setDevices([...devices])
  }
  
  
  const get = id=>{
    if (window.cardinal_device?.[id]) {
      return window.cardinal_device[id]
    } else {
      return {}
    }
  }
  
  
  useEffect(() => {
    if (window.cardinal_device) {
      setDevices(Object.keys(window.cardinal_device).map(key=>{
        return window.cardinal_device[key]
      }))
    }
  }, [])
  
  
  // useEffect(() => {
  //   if (devices) {
  //     console.log('DEVICES', devices)
  //   }
  // }, [devices])
  
  
  return {
    connect,
    devices,
    disconnect,
    get,
  }
}