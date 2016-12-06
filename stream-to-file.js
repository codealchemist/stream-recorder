const fs = require('fs')
const request = require('request')
const prettyBytes = require('pretty-bytes')
const [ url, file, time ] = process.argv.slice(2)

// load and display ascii art
const art = fs.readFileSync('./ascii-art.txt', 'utf8')
console.info(art)

// validations
if (!url || !file) {
  console.log(`
    Usage: node stream-to-file.js [url] [outputFile] [[time]]

    - url: The url with the audio stream.
    - outputFile: The file where you want to write audio to.
    - time: Optional. Recording will stop after this amount of time.
      If not specified recoding will continue until the ctrl+c is pressed.
      Format: HH:mm
      Example: 0:10 (stop after 10 minutes)
  `)
  process.exit()
}

// create write stream
const ws = fs.createWriteStream(file)

// display params
console.log(`
  - stream source : ${url}
  - target file   : ${file}
  - recording time: ${time}

  --- RECORDING ---
`)

// read remote stream and pipe into the write stream
request
  .get(url)
  .pipe(ws)

// stop recording after specified amount of time
if (time) {
  const timeParts = time.split(':')
  const hours = parseInt(timeParts[0], 10)
  const minutes = parseInt(timeParts[1], 10)
  const timeMs = ((hours*60*60) + (minutes*60)) * 1000

  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
    console.error('  - Invalid time. Cancel recording with ctrl+c.')
  } else {
    setTimeout(() => {
      ws.end()
      process.exit()
    }, timeMs)
  }
}

// display written data length when done
ws.on('finish', () => {
  const size = prettyBytes(ws.bytesWritten)
  console.log(`  - ${size} written successfully!
  `)
})
