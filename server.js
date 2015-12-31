var express = require('express')
var path = require('path')
var app = express()
var port = 4500

//serve static files
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/',function(req, res){
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(err){
  if(err){
    console.error(err)
  }else{
    console.info('Listen on port[' + port + ']')
  }
})
