export default {
  LivLovHRM: {
    HeartRate: {
      // SERVICE: 'AAE28F00-71B5-42A1-8C3C-F9CF6AC969D0',
      SERVICE: 0x180D,
      READ: '00002a37-0000-1000-8000-00805f9b34fb',
    },
    Battery: {
      SERVICE: 0x180F,
      READ: '00002a19-0000-1000-8000-00805f9b34fb',
    }
  },

  Nova100: {
    SERVICE: "0000fff0-0000-1000-8000-00805f9b34fb",
    READ: "0000fff1-0000-1000-8000-00805f9b34fb",
    WRITE: "0000fff2-0000-1000-8000-00805f9b34fb",
  },

  OSproPlus: {
    SERVICE: "0000fff0-0000-1000-8000-00805f9b34fb",
    READ:    "0000fff1-0000-1000-8000-00805f9b34fb",
    WRITE:   "0000fff2-0000-1000-8000-00805f9b34fb",
    MSG: {
      HEAD: 0xFB,
      FOOTER: 0xBF,
    },
    SYS: {
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
    },
  },

  OxySmart: {
    HeartRate: {
      SERVICE: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
      READ: '6e400003-b5a3-f393-e0a9-e50e24dcca9e',
    },
    Oxygen: {
      SERVICE: '0000fe59-0000-1000-8000-00805f9b34fb',
      READ: '8ec90001-f3154f609fb8-838830daea50',
    }
  },

  SmartLight: {
    // SERVICE: 0x181A,
    SERVICE: 0x181D,
    READ: "6e400003-b5a3-f393-e0a9-e50e24dcca9e",
    WRITE: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
  },

  SmartPlug: {
    SERVICE: "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
    ECHO: "beb5483e-36e1-4688-b7f5-ea07361b26a7",
    RELAY0: "beb5483e-36e1-4688-b7f5-ea07361b26a8",
  },

  url: {
    app: 'http://localhost:3000',
    host: 'http://localhost:3007',
    // host: 'https://api.shiftmaui.com',
  },
}