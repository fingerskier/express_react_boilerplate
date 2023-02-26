import React from 'react'
import useDevices from '../hook/useDevices'
import {DEVICE} from '../constants'
import Connector from './device/Connector'

import '../style/devices.css'


export default function() {
  const {connect, devices} = useDevices()
  
  
  return ( <div>
    Select the type of device to connect:
    <ul>
      {Object.keys(DEVICE).map((key,I)=><li key={I}>
        <button
          onClick={E=>connect(DEVICE[key])}
        >{key}::{DEVICE[key]}</button>
        </li>
      )}
    </ul>
    
    Devices:
    <ul>
      {devices?.map
        ? devices.map((X,I)=><li>
          <Connector
            device={window.cardinal_device[X.id]}
            key={I}
          />
        </li>)
        : <></>
      }
    </ul>
  </div> )
}