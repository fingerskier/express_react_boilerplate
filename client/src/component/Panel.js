import React, {useEffect, useState} from 'react'

import '../style/panel.css'


export default function({children, classes, icon, title}) {
  const [_classes, set_classes] = useState('panel')
  const [size, setSize] = useState('small')
  
  
  const toggleSize = event=>{
    if (size === 'big') {
      setSize('small')
    } else {
      setSize('big')
    }
  }
  
  
  useEffect(() => {
    set_classes(`panel ${classes} ${size}`)
  }, [classes, size])
  
  
  return (
    <div className={_classes}>
      {title? <button 
        className={`control button ${classes}`} 
        onClick={toggleSize}
        type='button'
      >
        <img src={icon} alt={title} />
      </button>: <></>}
      
      {size !== 'small'
        ? <div className="content">
            <h1>{title}</h1>
            {children}
          </div>
        : <></>
      }
    </div>
  )
}