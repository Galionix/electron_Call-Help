var app = require('express')();
var http = require('http').Server(app);
const config = require('config')
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
// const {Schema, model, Types} = require('mongoose')

const User = require('./schema/User')

function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("ru-RU", {timeZone: tzString}));   
}

const mongoose = require('mongoose');
let db; 
// var url = "mongodb://127.0.0.1:27017/callhelp";


// const User = mongoose.model('User',UserSchema);

async function start() {
  try {
 await mongoose.connect(config.get('mongoUri'),{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false //should i use this?

})

console.log('mongodb url: ' + config.get('mongoUri'));


  } catch (e) {
    console.log('server error ' + e.message);
    process.exit(1)
    
  }
}
start();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
// try {
// } catch (error) {
//   console.log('error in registar method '+error.message );
// }  

  socket.on('register user', function(usr){ 
  
  console.log('registering user', usr);
  // mongoose.
  // const need_register =  User.findOne({uid: usr.uid})
  // if(!need_register) console.log('no such user!');
  // else console.log('user with uid '+usr.uid );
  
  let user = new User ({
    uid: usr.uid,
    name: usr.name+"_temp",
    role: usr.role,
    level: usr.level
  });

   
 let save_it =  async () =>{
    try {
      
// user.save().catch( (e)=>{
//   console.log('error saving! ' + e.message);
  
// } )  .then(console.log('user saved! ' ))


  
const updated =   await User.findOneAndUpdate(
    { name: usr.name },
    {  $set: { "online": Date.now() } },
    {returnNewDocument : true}
    )
console.log(

  updated.online.toLocaleString("ru-RU", {timeZone: 'Europe/Kiev'})
  // convertTZ(,   'Europe/Kiev')
  );
 


   
    } catch (error) {
      console.log('error! ' + error.message );
    }
}

save_it();
  
  
  

  }
  

);
// TODO user create chat
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('chat message', msg);
    
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
