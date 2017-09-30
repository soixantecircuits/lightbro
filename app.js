'use strict'

const DMX = require('dmx')
const { SpacebroClient } = require('spacebro-client')
const A = DMX.Animation

const dmx = new DMX()

// var universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', '/dev/cu.usbserial-6AVNHXS8')
// var universe = dmx.addUniverse('demo', 'enttec-open-usb-dmx', '/dev/cu.usbserial-6AVNHXS8')
//var universe = dmx.addUniverse('usb-to-dmx', 'enttec-open-usb-dmx', '/dev/serial')

//universe.update({1: 255, 2: 0})

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
      console.log('update-light', data.channel, data.level)
      //universe.update({1: 255, 2: 0})
  })