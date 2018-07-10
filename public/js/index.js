 var socket = io();
    socket.on('connect',function ()  {                        console.log('Connected to server');
//    socket.emit('createEmail',{
//        to:'xyz@example.com',
//        text:'Hi you!'
//    });
                             
    });
    socket.on('disconnect',function () {
       console.log('Disconnected from server'); 
    });
    socket.on('newMessage',function (message) {
       console.log('newMessage', message); 
    });
//    socket.on('newEmail', function (email) {
//       console.log('New email ',email); 
//    });
   socket.emit('createMessage',{
       from:'Frank',
           text:'Hi'
    }, function (data) {
               console.log('Got it',data);
               });                                  
         
   //function will be fired when acknowledgement arrives at client