# stream-to-file
Writes remote streams to local files.


## Install

For CLI usage you should do a global install:

`npm install -g stream-to-file`

For programatic usage in your project:

`npm install --save stream-to-file`


## CLI usage
`stream-to-file [url] [outputFile] [[time]]`

- *url:* The url with the audio stream.
- *outputFile:* The file where you want to write audio to.
- *time:* Optional. Recording will stop after this amount of time.
  If not specified recoding will continue until the `ctrl+c` is pressed.
  Format: `HH:mm`
  Example: `0:10` (stop after 10 minutes)


## Programatic usage
```
const StreamToFile = require('stream-to-file')
const downloader = new StreamToFile({
  url: 'http://19353.live.streamtheworld.com:3690/977_90_SC',
  file: './test.mp3',
  time: '0:01'
})

downloader
  .onDone((data) => {
    console.log('DOWNLOAD COMPLETED!', data)
  })
  .onInvalidTime(() => {
    console.error('  - Invalid time. Cancel recording with ctrl+c.')
  })
  .download()
```


## Test

If you clone this repo and want to test your code changes just run:
`npm test`

Then try running the sample implementation:
`node test.js`

Have fun!
