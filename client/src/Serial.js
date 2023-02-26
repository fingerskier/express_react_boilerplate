import React, {useState} from 'react'


export default function() {
  const [devices, setDevices] = useState([])


  const get = async(event)=>{
    const stuff = await fetch('/serial')
      .then(res=>res.json())
      .catch(console.error)

    setDevices(stuff)
  }


  return (
    <div>
      <h3>Serial Ports</h3>

      <button onClick={get}>Find Serial Devices</button>

      {devices.map((X,I)=><li key={I}>{JSON.stringify(X)}</li>)}
    </div>
  )
}