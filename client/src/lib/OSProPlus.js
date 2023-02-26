import fullConfiguration from '../config'
import Device from './Device'
import { createMessage } from './esProPlus'
import {sleep} from './util'

const config = fullConfiguration.OSproPlus

const UUID = {
  read: config.READ,
  write: config.WRITE,
  service: config.SERVICE,
}

const {MSG, SYS} = config


class OSProPlus extends Device {
  msgGapTime = 234
  readChannel = {}
  settings = {}
  writeChannel = {}
  
  constructor(name) {
    if (name) {
      super({
        deviceName: name,
        uuid: UUID.service,
      })
    } else {
      super({
        deviceNamePrefix: 'OsteoStro',
        uuid: UUID.service,
      })
    }
  }
  
  
  async initialize() {
    this.connected = false
    this.transmitting = false
    
    await this.connect()
    
    this.connected = true
    
    
    this.readChannel = await this.characteristic(UUID.read)
    this.writeChannel = await this.characteristic(UUID.write)
    
    this.readChannel.addEventListener('characteristicvaluechanged', data=>{
      // console.log(data)
    })
    
    this.readChannel.startNotifications()
    
    this.transmitting = true
    
    console.log('OS-Pro+ intialized')
    
    this.name = this.device.name
    this.id = this.device.id
    
    return this.device.id
  }
  
  async flash() {
    const priorTime = this.settings.time
    const priorRedBrightness = this.settings.redBrightness
    const priorRedFrequency = this.settings.redFrequency
    const priorNIRBrightness = this.settings.NIRBrightness
    const priorNIRFrequency = this.settings.NIRFrequency


    this.setTime(1)
    await sleep(this.msgGapTime)
    
    this.redBrightness(10)
    await sleep(this.msgGapTime)
    
    this.NIRBrightness(0)
    await sleep(this.msgGapTime)
    
    this.redFrequency(2)
    await sleep(this.msgGapTime)
    
    this.NIRFrequency(2)
    await sleep(this.msgGapTime)
    
    this.start()
    await sleep(4567)
    this.stop()
    
    this.setTime(priorTime)
    await sleep(this.msgGapTime)
    this.redBrightness(priorRedBrightness)
    await sleep(this.msgGapTime)
    this.NIRBrightness(priorNIRBrightness)
    await sleep(this.msgGapTime)
    this.redFrequency(priorRedFrequency)
    await sleep(this.msgGapTime)
    this.NIRFrequency(priorNIRFrequency)
    await sleep(this.msgGapTime)
  }
  
  getAddress() {
    this.sendCommand(SYS.INFO, SYS.INFO_ADDRESS, -1)
  }

  getModel() {
    this.sendCommand(SYS.INFO, SYS.INFO_MODEL, -1)
  }

  getStatus() {
    this.sendCommand(SYS.STATUS, 0, -1)
  }

  getTime() {
    this.sendCommand(SYS.TIME, 0, -1)
  }

  getVersion() {
    this.sendCommand(SYS.INFO, SYS.INFO_VER, -1)
  }
  
  
  redBrightness(value) {
    this.settings.redBrightness = value
    this.sendCommand(SYS.CONTROL, SYS.CONTROL_R_PWM, +value)
  }
  
  redFrequency(value) {
    this.settings.redFrequency = value
    this.sendCommand(SYS.CONTROL, SYS.CONTROL_R_FER, +value, true)
  }
  
  
  NIRBrightness(value) {
    this.settings.NIRBrightness = value
    this.sendCommand(SYS.CONTROL, SYS.CONTROL_RW_PWM, +value)
  }
  
  NIRFrequency(value) {
    this.settings.NIRFrequency = value
    this.sendCommand(SYS.CONTROL, SYS.CONTROL_RW_FER, +value, true)
  }
  
  
  sendCommand(command,data,value,isHiZero=false) {
    try {
      let output = createMessage(command, data, value, isHiZero)
      
      this.writeChannel.writeValue(output)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  /**
   * 
   * @param {Integer} value ~ time in minutes
   */
  setTime(value) {
    this.settings.time = value
    this.sendCommand(SYS.CONTROL, SYS.CONTROL_TIME, +value, true)
  }
  
  
  start() {
    this.sendCommand(SYS.CONTROL, SYS.CONTROL_START, -1)
  }

  stop() {
    this.sendCommand(SYS.CONTROL, SYS.CONTROL_STOP, -1)
  }
}


export default OSProPlus