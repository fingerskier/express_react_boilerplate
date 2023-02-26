import {useEffect, useState} from 'react'
import useDevices from '../../hook/useDevices'


export default function({element, index}) {
  const {connect, disconnect, get} = useDevices()
  
  const [classes, setClasses] = useState('')
  const [device, setDevice] = useState({})
  
  
  useEffect(() => {
    if (element?.id) setDevice(window.cardinal_device[element.id])
  }, [element])
  
  
  useEffect(() => {
    if (device) {
      let status = 0
      
      if (device.connected) ++status
      if (device.transmitting) ++status
      
      if (status === 2) setClasses('connector transmitting')
      else if (status === 1) setClasses('connector connected')
      else setClasses('')
    }
  }, [device])
  
  
  return (<>
    {device
      ? <li>
          <div className={classes}>
            <em>{device.name}</em> <sub>{device.id}</sub>
            <br />
            <button onClick={E=>connect(device.type, device.name)}>Reconnect</button>
            
            <button onClick={E=>disconnect(device.id)}>Disconnect</button>
          </div>
        </li>
      : <></>
    }
  </>)
}
