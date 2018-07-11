const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validators');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT ||3000;

//console.log(__dirname+'/../public');
//console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//we will use io to communicate between user and client
app.use(express.static(publicPath));

//listens for a new client connection and lets us does something on that
io.on('connection',(socket) => {
    console.log('New user connected');
    socket.emit('newMessage',generateMessage('Admin',"Welcome to chat app"));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));
    socket.on('join',(params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.');
        }
        callback();
    });
//emits to client side
//socket.emit('newEmail', {
//    from:'abc@example.com',
//    text:'Hey there!',
//    createdAt:123
//});
   
socket.on('createMessage',(res,callback) => {
    console.log('Create message ',res);
//    io.emit('newMessage',{
//        from:res.from,
//        text:res.text,
//        createdAt:new Date().getTime()
//    });
    io.emit('newMessage',generateMessage(res.from,res.text));
    callback();
});    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    })
//listens to emitted event by client 
//socket.on('createEmail',(newEmail) => {
//   console.log('createEmail ',newEmail); 
//});   //socket.emit emits to single connection while io.emit emits to all
//listens to disconnect event
socket.on('disconnect',() => {
   console.log('Disconnected from user'); 
});
});
server.listen(port,() => {
    console.log(`Server is up on ${port}.`);
});

//broadcasting is emitting an event to everybody except one 