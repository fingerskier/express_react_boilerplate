import {useEffect, useState} from 'react'
import useDevices from '../../hook/useDevices'


export default function({ID}) {
  const {connect, disconnect, get} = useDevices()
  
  const [classes, setClasses] = useState('')
  const [device, setDevice] = useState()
  
  const checkStatus = ()=>{
    console.log('CONX:checkStatus', device)
    if (device?.device?.gatt) {
      let status = 0
      
      if (device.connected) ++status
      if (device.transmitting) ++status
      
      if (status === 2) setClasses('connector transmitting')
      else if (status === 1) setClasses('connector connected')
      else setClasses('connector disconnected')
    } else {
      setClasses('connector disconnected')
    }
  }
  

  const disconnectDevice = async(event)=>{
    await disconnect(device.id)
  }
  
  const makeConnection = async(event)=>{
    await connect(device.type, device.name)
    
    checkStatus()
  }
  
  
  useEffect(() => {
    checkStatus()
  }, [device])
  
  
  useEffect(() => {
    if (ID) {
      setDevice(get(ID))
    }
  }, [ID])
  
  
  return (<>
    {device
      ? <div className={classes}>
          <em>{device.name}</em>
          {/* <sub>{device.id}</sub> */}
          <br />
          <button onClick={makeConnection}>Reconnect</button>
          
          <button onClick={disconnectDevice}>Disconnect</button>
        </div>
      : <></>
    }
  </>)
}
