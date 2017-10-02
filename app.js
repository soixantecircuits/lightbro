'use strict'

const DMX = require('dmx')
const { SpacebroClient } = require('spacebro-client')
const A = DMX.Animation

const dmx = new DMX()

// var universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', '/dev/cu.usbserial-6AVNHXS8')
// var universe = dmx.addUniverse('demo', 'enttec-open-usb-dmx', '/dev/cu.usbserial-6AVNHXS8')
//var universe = dmx.addUniverse('usb-to-dmx', 'enttec-open-usb-dmx', '/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_AL03CBJK-if00-port0')
var universe = dmx.addUniverse('usb-to-dmx', 'enttec-open-usb-dmx', '/dev/ttyUSB0')

let pingpong = () => {
  console.log("bang on")  
  universe.update({0: 255, 1: 255, 2:255, 3:255, 4:255})
  setTimeout(()=>{
    universe.update({0: 0, 1: 0, 2:0, 3:0, 4:0})
  }, 100)
  
  setTimeout(()=>{
    console.log("bang off")
    universe.update({0: 255, 1: 255, 2:255, 3:255, 4:255})
    setTimeout(()=>{
      universe.update({0: 0, 1: 0, 2:0, 3:0, 4:0})
    }, 100)
  }, 1000 * 5)    
}

let bang = (channel, value) => {
  console.log('bang', channel, value)
  universe.update({channel:value})
  setTimeout(()=>{
    universe.update({channel: 0})
  }, 100)
}

const client = new SpacebroClient({
    host: 'spacebro.space',
    port: 3333,
    channelName: 'media-stream',
    client: {
      name: 'dmx-light',
      description: "a simple tool to control light",
      in: {
        'update-light': {
          eventName: 'update-light',
          description: "Update the light during an exhib",
          type: "all"
        }
      }
    }
  })
  
  client.on('update-light', (data) => {
    let val = {}
    console.log(data)
    console.log('update-light', data.channel, data.level)
    bang(data.channel, data.level)
  })

  //pingpong()

  //setInterval(pingpong, 10000)