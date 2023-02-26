import {useRef, useState} from 'react'
import OSProPlusSettings from './OSProPlusSettings'
import useDevices from '../hook/useDevices'
import {DEVICE} from '../constants'

import '../style/settings.css'


export default function({time, setTime}) {
  const {connect, devices, get} = useDevices()
  
  const [preTime, setPreTime] = useState(time)
  
  
  return ( <div>
    <label>
      Time:&nbsp;
      
      <input
        min="1"
        max="20"
        onChange={E=>setPreTime(E.target.value)}
        type="range"
        value={preTime}
      />
    </label>
    
    {preTime}min
    
    <button onClick={E=>setTime(preTime)}>Set Time</button>
    
    <ul>
      {devices
        ? Object.keys(devices).map((key,I)=>{
            const X = devices[key]
            let content = <></>
            
            
            if (X.type === DEVICE.OSPROPLUS150) {
              content = <OSProPlusSettings
                ID={X.id}
                time={time}
              />
            } else if (X.type === DEVICE.OSPROPLUS300) {
              content = <OSProPlusSettings
                ID={X.id}
                time={time}
              />
            }
            
            return <li key={I}>
              {content}
            </li>
          })
        : <>No devices connected</>
      }
    </ul>
  </div> )
}