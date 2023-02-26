import React, {useEffect, useState} from 'react'


export default function({
  className='device button gui flexy columnar',
  device,
}) {
  return (<>
    <div className={className}>
      <div>Smart-Light Admin</div>

      <div className="flexy">
        Channel 1
        <button onClick={E=>device.deactivate(0)}>On</button>
        <button onClick={E=>device.activate(0)}>Off</button>
      </div>

      <div className="flexy">
        Channel 2
        <button onClick={E=>device.deactivate(1)}>On</button>
        <button onClick={E=>device.activate(1)}>Off</button>
      </div>

      <div className="flexy">
        Channel 3
        <button onClick={E=>device.deactivate(2)}>On</button>
        <button onClick={E=>device.activate(2)}>Off</button>
      </div>

      <div className="flexy">
        Channel 4
        <button onClick={E=>device.deactivate(3)}>On</button>
        <button onClick={E=>device.activate(3)}>Off</button>
      </div>
    </div>
  </>)
}