export const SYS = {
  INFO: 0x50,
  INFO_MODEL: 0x0,
  INFO_ADDRESS: 0x1,
  INFO_VER: 0x2,
  STATUS: 0x51,
  STATUS_NORMAL: 0x0,
  STATUS_END: 0x1,
  STATUS_RUNNING: 0x2,
  STATUS_ERROR: 0x3,
  TIME: 0x52,
  CONTROL: 0x53,
  CONTROL_R_PWM: 0x3,
  CONTROL_RW_PWM: 0x4,
  CONTROL_R_FER: 0x5,
  CONTROL_RW_FER: 0x6,
  CONTROL_START: 0x8,
  CONTROL_STOP: 0x0,
  CONTROL_TIME: 0x7,
}

const MSG_HEAD = 0xFB;
const MSG_FOOTER = 0xBF;


export function byteValue(num) {
  return num & 0xFF
}  


export function hexSubStr(originalValue, startIndex, endIndex) {
  let temp0 = originalValue.substr(startIndex, endIndex)

  let temp1 = parseInt(temp0, 16)

  // console.log('HEXSUB', originalValue, startIndex, endIndex, temp0, temp1.toString())

  return temp0.toString()
}  


export function createMessage(cmd, data, value, isHighZero=false) {
  let bytes

  // console.log('ARGS', cmd, data, value, isHighZero)


  if (data === -1) {
    bytes = new Uint8Array([
      byteValue(MSG_HEAD),
      byteValue(cmd),
      byteValue(cmd),
      byteValue(MSG_FOOTER),
    ])
  }


  if (value === -1) {
    bytes = new Uint8Array([
      byteValue(MSG_HEAD),
      byteValue(cmd),
      byteValue(data),
      byteValue(cmd ^ data),
      byteValue(MSG_FOOTER),
    ])
  } else {
    const hexValue = value.toString(16)
    // console.log('HEX', value, hexValue)

    if (hexValue.length === 4) {
      const high = hexSubStr(hexValue, 0, 2)
      const low = hexSubStr(hexValue, 2, 4)
      const checksum = cmd ^ data ^ high ^ low
      
      // console.log('HEXHILO', high, low)
      
      bytes = new Uint8Array([
        byteValue(MSG_HEAD),
        byteValue(cmd),
        byteValue(data),
        byteValue(high),
        byteValue(low),
        byteValue(checksum),
        byteValue(MSG_FOOTER),
      ])
    } else if (hexValue.length === 3) {
      const high = hexSubStr(hexValue, 0, 1)
      const low = hexSubStr(hexValue, 1, 3)
      const checksum = cmd ^ data ^ high ^ low
      
      // console.log('HEX', hexValue, high, low)
      
      bytes = new Uint8Array([
        byteValue(MSG_HEAD),
        byteValue(cmd),
        byteValue(data),
        byteValue(high),
        byteValue(low),
        byteValue(checksum),
        byteValue(MSG_FOOTER),
      ])
    } else {
      const checksum = cmd ^ data ^ value

      if (isHighZero) {
        bytes = new Uint8Array([
          byteValue(MSG_HEAD),
          byteValue(cmd),
          byteValue(data),
          byteValue(0x00),
          byteValue(value),
          byteValue(checksum),
          byteValue(MSG_FOOTER),
        ])
      } else {
        bytes = new Uint8Array([
          byteValue(MSG_HEAD),
          byteValue(cmd),
          byteValue(data),
          byteValue(value),
          byteValue(checksum),
          byteValue(MSG_FOOTER),
        ])
      }
    }
  }

  let result = new Uint8Array(bytes)

  // console.log(bytes)

  return bytes
}