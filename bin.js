#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const StreamToFile = require('./index')
const [ url, file, time ] = process.argv.slice(2)

// load and display ascii art
const art = fs.readFileSync(path.join(__dirname, './ascii-art.txt'), 'utf8')
console.info(art)

// validations
if (!url || !file) {
  console.log(`
    Usage: stream-to-file [url] [outputFile] [[time]]

    - url: The url with the audio stream.
    - outputFile: The file where you want to write audio to.
    - time: Optional. Recording will stop after this amount of time.
      If not specified recoding will continue until the ctrl+c is pressed.
      Format: HH:mm
      Example: 0:10 (stop after 10 minutes)
  `)
  process.exit()
}

// display params
console.log(`
  - stream source : ${url}
  - target file   : ${file}
  - recording time: ${time}

  --- RECORDING ---
`)

const downloader = new StreamToFile({url, file, time})
downloader
  .onDone(({size}) => {
    console.log(`  - ${size} written successfully!\n`)
    process.exit()
  })
  .onInvalidTime(() => {
    console.error('  - Invalid time. Cancel recording with ctrl+c.')
  })
  .download()
