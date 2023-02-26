import React, {useEffect, useState} from 'react'
import useDevices from '../hook/useDevices'
import { sleep } from '../lib/util'


export default function({
  className='device settings',
  ID,
  time,
}) {
  const {get} = useDevices()
  
  const [device, setDevice] = useState({})
  
  
  const flash = async()=>{
    await device.flash()
  }
  
  
  useEffect(() => {
    setDevice(get(ID))
  }, [ID])
  
  
  useEffect(() => {
    if (device?.setTime && time) {
      Promise.all([
        device.setTime(time),
        sleep(234),
      ])
    }
  }, [device, time])
  
  
  return (<>
    <div className={className}>
      <div>OS-Pro+ {device?.name}</div>
      
      <label>
        Red Brightness:&nbsp;
        
        <input onBlur={E=>device.redBrightness(E.target.value)} type="range" max="100" />
      </label>
      <br />    
      <label>
        Red Frequency:&nbsp;
        
        <input onBlur={E=>device.redFrequency(E.target.value)} type="range" max="2000" />
      </label>
      <br />    
      <label>
        NIR Brightness:&nbsp;
        
        <input onBlur={E=>device.NIRBrightness(E.target.value)} type="range" max="100" />
      </label>
      <br />    
      <label>
        NIR Frequency:&nbsp;
        
        <input onBlur={E=>device.NIRFrequency(E.target.value)} type="range" max="2000" />
      </label>
      
      <div className="flexy">
        <button type="button">Set</button>
        <button onClick={flash}>Show</button>
        <button onClick={E=>device.start()}>Start</button>
        <button onClick={E=>device.stop()}>Stop</button>
      </div>
    </div>
  </>)
}