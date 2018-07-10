const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');


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
//emits to client side
socket.emit('newEmail', {
    from:'abc@example.com',
    text:'Hey there!',
    createAt:123
});
//listens to emitted event by client 
socket.on('createEmail',(newEmail) => {
   console.log('createEmail ',newEmail); 
});   
//listens to disconnect event
socket.on('disconnect',() => {
   console.log('Disconnected from user'); 
});
});
server.listen(port,() => {
    console.log(`Server is up on ${port}.`);
});