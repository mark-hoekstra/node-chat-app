const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket)=>{
    console.log('New user connected')

    socket.emit('newMessage', {
        from: 'mika@example.com',
        text: 'Hey, what is going on?',
        createAt: new Date().getTime(),
    });

    socket.on('createMessage', (createMessage)=>{
        console.log('A new message was created:', createMessage);
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started up on port ${port}`);
  });
