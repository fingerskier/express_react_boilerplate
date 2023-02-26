import React, {useEffect, useState} from 'react'
import useDevices from '../hook/useDevices'
import {lerp} from '../lib/gfx'

import clockFace from '../img/clock_face.jpg'
import '../style/main.css'


export default function({time}) {
  const startAngle = 60
  
  const {devices, get} = useDevices()
  
  const [clockElements, setClockElements] = useState([])
  const [rotation, setRotation] = useState(startAngle)
  const [running, setRunning] = useState(false)
  const [segmentRotation, setSegmentRotation] = useState(12)
  
  let timer
  let elapsed = 0
  let runningInterval = 25
  
  
  useEffect(() => {
    if (running) {
      let fullTime = 60 * 1000 * clockElements[clockElements.length-1]
      
      let T = 0
      let dRotate = 360 / (fullTime / runningInterval)
      
      
      for (let key in devices) {
        const dev = get(key)

        console.log('RUN', dev)
        if (dev?.start) {
          dev.start()
          console.log('START', dev)
        }
      }
      
      
      timer = setInterval(() => {
        T += runningInterval
        
        const newRot = rotation + dRotate
        setRotation(prev=>prev+dRotate)
        
        if (T >= fullTime) clearInterval(timer)
      }, runningInterval);
    } else {
      for (let key in devices) {
        const dev = get(key)
        
        if (dev?.stop) {
          dev.stop()
          console.log('STOP', dev)
        }
      }
      
      clearInterval(timer)
      setRotation(startAngle)
    }
    
    return ()=>clearInterval(timer)
  }, [running])
  
  
  useEffect(() => {
    if (time) {
      const newEl = [...Array(20).keys()]
      
      const segmentMinutes = time / 19
      
      for (let I in newEl) newEl[I] = +I * segmentMinutes
      
      setSegmentRotation(360 / newEl.length)
      
      setClockElements(newEl)
    }
  }, [time])
  
  
  function ClockDigit(X,I,A) {
    const val = Math.round(X*60) // show seconds on dial labels
    
    return <span
      className='char'
      key={I}
      style={{transform: `rotate(${segmentRotation*I}deg)`}}
    >{val}</span>
  }
  
  
  return (
    <div className="main">
      <div className="marker"></div>
      <img src={clockFace} alt="" className="underlay" />
      <div 
        className="clock"
        style={{transform: `rotate(${rotation}deg)`}}
      >
        <h1>
          {clockElements.map(ClockDigit)}
        </h1>
      </div>
      <br />
      <button className='control button' onClick={E=>setRunning(!running)}>
        {running? 'Stop': 'Run'}
      </button>
    </div>
  )
}