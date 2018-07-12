const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validators');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT ||3000;

//console.log(__dirname+'/../public');
//console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//we will use io to communicate between user and client
app.use(express.static(publicPath));
var users = new Users();

//listens for a new client connection and lets us does something on that
io.on('connection',(socket) => {
    console.log('New user connected');
   
    socket.on('join',(params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and room name are required.');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //io.emit -> emits to all -> io.to() [for sending to people in same room]
    //socket.broadcast.emit -> emits to all except current user -> socket.broadcast.emit.to() [for sending to people in same room]
    //socket.emit -> except to the current user only
    
     socket.emit('newMessage',generateMessage('Admin',"Welcome to chat app"));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        callback();
    });
    
    
//emits to client side
//socket.emit('newEmail', {
//    from:'abc@example.com',
//    text:'Hey there!',
//    createdAt:123
//});
   
socket.on('createMessage',(res,callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(res.text)) {
        io.to(user.room).emit('newMessage',generateMessage(user.name,res.text));  
    }
//    io.emit('newMessage',{
//        from:res.from,
//        text:res.text,
//        createdAt:new Date().getTime()
//    });
  
    callback();
});    
    socket.on('createLocationMessage', (coords) => {
       var user = users.getUser(socket.id); 
      if(user) {  io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }
    });
//listens to emitted event by client 
//socket.on('createEmail',(newEmail) => {
//   console.log('createEmail ',newEmail); 
//});   //socket.emit emits to single connection while io.emit emits to all
//listens to disconnect event
socket.on('disconnect',() => {
   var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin', ` ${user.name} has left.`));
        }
});
});
server.listen(port,() => {
    console.log(`Server is up on ${port}.`);
});

//broadcasting is emitting an event to everybody except one 