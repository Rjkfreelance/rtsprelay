const express = require('express');
const app = express();
const { proxy } = require('rtsp-relay')(app);

const handler1 = proxy({
  //url: `rtsp://admin:admin@10.0.1.2:554/feed`,
  //url: `rtsp://202.50.121.42/live/ch00_0`,
  url:`rtsp://116.197.222.158/live/ch00_0`,
    
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
 
  });

const handler2 = proxy({
  url: `rtsp://176.62.177.193/live/ch00_0`,
  verbose: false,
})

const handler3 = proxy({
  url: `rtsp://192.162.98.201/live/ch00_0`,
  verbose: false,
})



// the endpoint our RTSP uses
app.ws('/api/stream1', handler1)
app.ws('/api/stream2', handler2)
app.ws('/api/stream3', handler3)

// this is an example html page to view the stream
app.get('/', (req, res) =>

  res.send(`
  
  <canvas id='canvas1' style="display:block;width:60%;height:60%;"></canvas>
  

  <script src='https://cdn.jsdelivr.net/gh/phoboslab/jsmpeg@9cf21d3/jsmpeg.min.js'></script>
  <script>
    new JSMpeg.Player('wss://' + location.host + '/api/stream1', {
      canvas: document.getElementById('canvas1')
      
    })
    
  </script>
`),


);
app.get('/cam2', (req, res) =>
 

  res.send(`
  
  <canvas id='canvas1' style="display:block;width:60%;height:60%;"></canvas>

  <script src='https://cdn.jsdelivr.net/gh/phoboslab/jsmpeg@9cf21d3/jsmpeg.min.js'></script>
  <script>
    
    new JSMpeg.Player('wss://' + location.host + '/api/stream2', {
      canvas: document.getElementById('canvas1')
      
    })
  </script>
`),


);

app.get('/cam3', (req, res) =>
 

  res.send(`
  
  <canvas id='canvas1' style="display:block;width:60%;height:60%;"></canvas>

  <script src='https://cdn.jsdelivr.net/gh/phoboslab/jsmpeg@9cf21d3/jsmpeg.min.js'></script>
  <script>
    
    new JSMpeg.Player('wss://' + location.host + '/api/stream3', {
      canvas: document.getElementById('canvas1')
      
    })
  </script>
`),


);

console.log("Server Start on port: 8000")
app.listen(process.env.PORT||8000);
