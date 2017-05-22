const StreamToFile = require('./index')
const downloader = new StreamToFile({
  url: 'http://19353.live.streamtheworld.com:3690/977_90_SC',
  file: './test.mp3',
  time: '0:01'
})
console.log('\nDOWNLOADING', downloader)

downloader
  .onDone((data) => {
    console.log('\nDOWNLOAD COMPLETED!', data)
    process.exit()
  })
  .download()

