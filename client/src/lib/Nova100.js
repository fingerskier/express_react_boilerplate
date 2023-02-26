import fullConfiguration from '../config'
import Device from './Device'

const config = fullConfiguration.Nova100

const UUID = {
  read: config.READ,
  write: config.WRITE,
  service: config.SERVICE,
}

console.log(config)

const {MSG, SYS} = config


class Nova100 extends Device {
  readChannel = {}
  writeChannel = {}
  
  
  constructor() {
    // super({
    //   deviceNamePrefix: 'mito',
    //   uuid: UUID.service,
    // })
    super()
  }
  
  
  async initialize() {
    this.connected = false
    this.transmitting = false
    
    await this.connect()
    
    this.connected = true

    this.readChannel = await this.characteristic(UUID.read)
    this.writeChannel = await this.characteristic(UUID.write)

    this.readChannel.addEventListener('characteristicvaluechanged', data=>{
      console.log(data)
    })
    
    this.readChannel.startNotifications()

    this.transmitting = true

    console.log('Nova100 intialized')

    this.name = this.device.name
    this.id = this.device.id

    return this.device.id
  }
  
  
  mode(value) {
    this.sendCommand(`qx+sel=${+value}`)
  }
  
  
  sendCommand(command) {
    try {
      let output = command + '\r\n'
      
      output = encoder.encode(output)
      
      this.writeChannel.writeValue(output)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  start() {
    this.sendCommand("qx+play=1")
  }
  
  stop() {
    this.sendCommand("qx+play=0")
  }
}


export default OSProPlus