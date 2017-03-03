```
     _                                  _               __ _ _
 ___| |_ _ __ ___  __ _ _ __ ___       | |_ ___        / _(_) | ___
/ __| __| '__/ _ \/ _` | '_ ` _ \ _____| __/ _ \ _____| |_| | |/ _ \
\__ \ |_| | |  __/ (_| | | | | | |_____| || (_) |_____|  _| | |  __/
|___/\__|_|  \___|\__,_|_| |_| |_|      \__\___/      |_| |_|_|\___|

    [ Writes remote streams to local files. ]
    
    Usage: node stream-to-file.js [url] [outputFile] [[time]]

    - url: The url with the audio stream.
    - outputFile: The file where you want to write audio to.
    - time: Optional. Recording will stop after this amount of time.
      If not specified recoding will continue until the ctrl+c is pressed.
      Format: HH:mm
      Example: 0:10 (stop after 10 minutes)
```


### TODO
Add recording start time.
