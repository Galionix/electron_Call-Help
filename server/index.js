var app = require('express')();
var http = require('http').Server(app);
const config = require('config')
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const User = require('./schema/User')


const mongoose = require('mongoose');
 
var url = "mongodb://127.0.0.1:27017/";

 
async function start() {
  try {
await mongoose.connect(config.get('mongoUri'),{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true

})
  } catch (e) {
    console.log('server error ' + e.message);
    process.exit(1)
    
  }
}
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('register', function(msg){
    io.emit('chat message', msg);
    console.log('chat message', msg);
    
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('chat message', msg);
    
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
