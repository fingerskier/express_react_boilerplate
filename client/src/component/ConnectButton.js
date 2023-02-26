import React, {cloneElement, useState} from 'react'
import OSProPlus from '../../lib/OSProPlus'
import OSProPlusAdmin from './OSProPlusAdmin'
import SmartLight from '../../lib/SmartLightDevice'
import SmartLightAdmin from './SmartLightAdmin'


export default function({deviceId, deviceType}) {
  const [active, setActive] = useState(false)
  const [classes, setClasses] = useState()
  
  
  
  return <button className={classes} onClick={conx}>
    {active
      ? 'Dissemble'
      : 'Connect'
    }
  </button>
}