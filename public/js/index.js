 var socket = io();
    socket.on('connect',function ()  {                        console.log('Connected to server');
    socket.emit('createEmail',{
        to:'xyz@example.com',
        text:'Hi you!'
    });
    socket.emit('newMessage',{
        from:'UserName',
        text:'Hello all'
    });                                  
    });
    socket.on('disconnect',function () {
       console.log('Disconnected from server'); 
    });
    socket.on('createMessage',function (message) {
       console.log('Create Message', message); 
    });
    socket.on('newEmail', function (email) {
       console.log('New email ',email); 
    });