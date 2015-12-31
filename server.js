var app = new (require('express'))()
var port = 4500

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
