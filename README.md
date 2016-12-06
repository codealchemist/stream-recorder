```
     _                                                             _
 ___| |_ _ __ ___  __ _ _ __ ___        _ __ ___  ___ ___  _ __ __| | ___ _ __
/ __| __| '__/ _ \/ _` | '_ ` _ \ _____| '__/ _ \/ __/ _ \| '__/ _` |/ _ \ '__|
\__ \ |_| | |  __/ (_| | | | | | |_____| | |  __/ (_| (_) | | | (_| |  __/ |
|___/\__|_|  \___|\__,_|_| |_| |_|     |_|  \___|\___\___/|_|  \__,_|\___|_|

    [ Writes remote streams to local files. ]
    
    Usage: node stream-record.js [url] [outputFile] [[time]]

    - url: The url with the audio stream.
    - outputFile: The file where you want to write audio to.
    - time: Optional. Recording will stop after this amount of time.
      If not specified recoding will continue until the ctrl+c is pressed.
      Format: HH:mm
      Example: 0:10 (stop after 10 minutes)
```


