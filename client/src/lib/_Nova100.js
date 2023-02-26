import BLEButton from '../BLEButton'
import config from '../../config'
import React, {useEffect, useState} from 'react'
import Runner from '../recipes/Runner'
import useBluetooth from '../../hook/useNova100'

let encoder = new TextEncoder('utf-8')


export default function Nova100({
  className='device button gui flexy',
  recipeData,
  type,
}) {
  const {
    connect,
    connected,
    transmitting,
    writeChannel,
  } = useBluetooth()


  const [ingredientRunMap, setIngredientRunMap] = useState({
    30: ()=>sendCommand("qx+play=1"),
    32: ()=>sendCommand("qx+play=0"),
    35: ()=>sendCommand("qx+sel=0"),
    42: ()=>sendCommand("qx+sel=1"),
    41: ()=>sendCommand("qx+sel=2"),
    40: ()=>sendCommand("qx+sel=3"),
    39: ()=>sendCommand("qx+sel=4"),
    38: ()=>sendCommand("qx+sel=5"),
    37: ()=>sendCommand("qx+sel=6"),
    36: ()=>sendCommand("qx+sel=7"),
  })

  const connectDevice = async()=>{
    await connect({
      deviceName: 'nova100',
      uuid: config.uuid.Nova100.SERVICE
    })
  }


  const sendCommand = command=>{
    try {
      let output = command + '\r\n'
      
      output = encoder.encode(output)

      writeChannel.writeValue(output)
    } catch (error) {
      console.error(error)
    }
  }


  function Button({children, command}) {
    return <button className="flat" onClick={()=>sendCommand(command)}>{children}</button>
  }


  useEffect(() => {
    setIngredientRunMap({
      30: ()=>writeChannel.writeValue(encoder.encode("qx+play=1\r\n")),
      32: ()=>writeChannel.writeValue(encoder.encode("qx+play=0\r\n")),
      35: ()=>writeChannel.writeValue(encoder.encode("qx+sel=0\r\n")),
      42: ()=>writeChannel.writeValue(encoder.encode("qx+sel=1\r\n")),
      41: ()=>writeChannel.writeValue(encoder.encode("qx+sel=2\r\n")),
      40: ()=>writeChannel.writeValue(encoder.encode("qx+sel=3\r\n")),
      39: ()=>writeChannel.writeValue(encoder.encode("qx+sel=4\r\n")),
      38: ()=>writeChannel.writeValue(encoder.encode("qx+sel=5\r\n")),
      37: ()=>writeChannel.writeValue(encoder.encode("qx+sel=6\r\n")),
      36: ()=>writeChannel.writeValue(encoder.encode("qx+sel=7\r\n")),
    })
  }, [writeChannel])


  return (<>
    <div className={className}>
      <div>Nova-100</div>

      <BLEButton
        connected={connected}
        transmitting={transmitting}
        onClick={connectDevice}
      ></BLEButton>

      <div className="flexy columnar">
        <Button command="qx+play=1">Play</Button>
        <Button command="qx+play=0">Stop</Button>
      </div>

      <div className="flexy columnar">
        <Button command="qx+sel=0">Mode 0</Button>
        <Button command="qx+sel=1">Mode 1</Button>
        <Button command="qx+sel=2">Mode 2</Button>
        <Button command="qx+sel=3">Mode 3</Button>
      </div>

      <div className="flexy columnar">
        <Button command="qx+sel=4">Mode 4</Button>
        <Button command="qx+sel=5">Mode 5</Button>
        <Button command="qx+sel=6">Mode 6</Button>
        <Button command="qx+sel=7">Mode 7</Button>
      </div>
    </div>

    <Runner
      ingredientRunMap={ingredientRunMap}
      recipeData={recipeData}
    />
  </>)
}