import { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'
import {room} from 'conx_client_api'


export default function() {
  /*
    A room object has a name, a row/col size, a list of devices, and a mapping of devices to row/col placement
  */
  const [devices, setDevices] = useLocalStorage('cardinal-room-devices', {})
  const [rooms, setRooms] = useLocalStorage('cardinal-rooms', [])
  
  const [list, setList] = useState([])
  
  
  const add = async(newRoomName='New Room')=>{
    console.log('adding room', {name: newRoomName})
    await room.create({name: newRoomName})
    
    load()
  }
  
  
  const assignDevice = async(roomID, deviceID, col, row)=>{
    await room.assignDevice({
      roomID: roomID,
      deviceID: deviceID,
      col: col,
      row: row,
    })
    
    const newRooms = rooms
    
    const thisRoom = newRooms[roomID]
    
    thisRoom.devices = await room.devices({roomID: roomID})
    
    setRooms(newRooms)
    
    console.log('RM DEV ASSIGN', newRooms)
  }


  const loadDevices = async(roomID)=>{
    const newDev = await room.devices(roomID)
    
    
    setDevices({
      ...devices,
      roomID: newDev,
    })
  }
  
  
  const load = async()=>{
    const newRooms = await room.list()
    
    setRooms(newRooms)
  }
  
  
  const update = async(id, name, height, width)=>{
    await room.update({
      roomID: id,
      name: name,
      height: height,
      width: width
    })
  }
  
  
  useEffect(() => {
    console.log('ROOMS', rooms)

    const newList = rooms.map(X=>{
      return {
        id: X.id,
        name: X.name,
        height: X.height,
        width: X.width,
      }
    })
    
    setList(newList)
  }, [rooms])
  
  
  
  return {
    add,
    assignDevice,
    list,
    load,
    update,
  }
}