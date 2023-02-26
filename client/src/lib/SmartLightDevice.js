import Device from './Device'
import fullConfiguration from '../config'

const config = fullConfiguration.SmartLight

const UUID = {
  read: config.READ,
  write: config.WRITE,
  service: config.SERVICE,
}


class SmartLight extends Device {
  connected = false
  deviceName = 'Smart-Light'
  device = {}
  encoder = new TextEncoder('utf-8')
  filters = []
  transmitting = false
  options = {}
  readChannel = {}
  server = {}
  service = {}
  state = 0
  writeChannel = {}


  constructor() {
    super({
      name: 'Smart-Light',
      uuid: UUID.service,
    })
  }


  async initialize() {
    try {
      this.connected = false
      this.transmitting = false
      
      await this.connect()
      
      console.log('SMART-LIGHT DEVICE', this.device)
    } catch (error) {
      console.error('Bluetooth connection error', error)
      this.cancel()
    }
    
    
    try {
      this.server = await this.device.gatt.connect()
      
      console.log('BLE SERVER', this.server, this.serviceUUID)
    } catch (error) {
      console.error('Bluetooth connection error', error)
      this.cancel()
    }
    
    
    try {
      this.service = await this.server.getPrimaryService(0x181D)
      
      console.log('BLE SERVICE')
    } catch (error) {
      console.error('Bluetooth connection error', error)
      this.cancel()
    }
    
    
    try {
      this.connected = true
      
      this.readChannel = await this.service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e')
      this.writeChannel = await this.service.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e')
      
      
      this.readChannel.addEventListener('characteristicvaluechanged', data=>{
      console.log(data)
      })
      
      this.readChannel.startNotifications()
      
      this.transmitting = true
      
      console.log('Smart-Light intialized')
      
      
      return this.service
    } catch (error) {
      console.error('Bluetooth connection error', error)
      this.cancel()
    }
  }


  cancel() {
    this.connected = false
    this.transmitting = false
  }


  async characteristic(uuid) {
    try {
      const result = await this.service.getCharacteristic(uuid)
      
      return result
    } catch (error) {
      console.error(error)
      this.cancel()
    }
  }


  activate(value) {
    const msg = this.encoder.encode(`activate=${+value}\r\n`)
    this.writeChannel.writeValue(msg)
  }

  deactivate(value) {
    const msg = this.encoder.encode(`deactivate=${+value}\r\n`)
    this.writeChannel.writeValue(msg)
  }
}


export default Device