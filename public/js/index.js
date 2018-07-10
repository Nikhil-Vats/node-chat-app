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
        var li = jQuery(`<li></li>`);
        li.text(`${message.from}: ${message.text}`);
        
        jQuery('#messages').append(li);
    });
//    socket.on('newEmail', function (email) {
//       console.log('New email ',email); 
//    });
//   socket.emit('createMessage',{
//       from:'Frank',
//           text:'Hi'
//    }, function (data) {
//               console.log('Got it',data);
//               });                                  
         
   //function will be fired when acknowledgement arrives at client
jQuery('#message-form').on('submit',function (e) {
   e.preventDefault(); 
    socket.emit('createMessage',{
        from:'user',
        text:jQuery('[name=message]').val()
    },function () {
        
    })
});