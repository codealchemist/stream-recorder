const fs = require('fs')
const request = require('request')
const prettyBytes = require('pretty-bytes')

module.exports = class StreamToFile {
  constructor ({url, file, time}) {
    this.url = url
    this.file = file
    this.time = time // hh:mm

    this.onDoneCallback = null
    this.validate()
  }

  validate () {
    if (!this.url || !this.file) {
      throw new Error('INVALID PARAMS: "url" and "file" are required.')
    }
  }

  onDone (callback) {
    this.onDoneCallback = callback
    return this
  }

  onInvalidTime (callback) {
    this.onInvalidTimeCallback = callback
    return this
  }

  download () {
    // Create write stream.
    const ws = fs.createWriteStream(this.file)

    // Read remote stream and pipe into the write stream.
    request
      .get(this.url)
      .pipe(ws)

    // Stop recording after specified amount of time.
    if (this.time) this.timer(ws)

    // Display written data length when done.
    ws.on('finish', () => {
      const size = prettyBytes(ws.bytesWritten)
      if (typeof this.onDoneCallback === 'function') {
        this.onDoneCallback({
          url: this.url,
          file: this.file,
          time: this.time,
          size
        })
      }
    })
  }

  timer (ws) {
    const timeParts = this.time.split(':')
    const hours = parseInt(timeParts[0], 10)
    const minutes = parseInt(timeParts[1], 10)
    const timeMs = ((hours * 60 * 60) + (minutes * 60)) * 1000

    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
      if (typeof this.onInvalidTimeCallback === 'function') {
        return this.onInvalidTimeCallback(this.time)
      }
      throw new Error(`INVALID TIME: ${this.time}. Format: [hh]:[mm].`)
    }

    setTimeout(() => {
      ws.end()
    }, timeMs)
  }
}
