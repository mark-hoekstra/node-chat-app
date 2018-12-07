const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket)=>{
    socket.emit('newMessage', generateMessage(
        'Admin',
        'Welcome to the chat app!'
    ));
    socket.broadcast.emit('newMessage', generateMessage(
        'Admin',
        'A new user joined.'
    ));

    socket.on('createMessage', (createMessage, callback)=>{
        console.log('A new message was created:', createMessage);
        io.emit('newMessage', generateMessage(createMessage.from, createMessage.text));
        callback('This is from the server.');
        // socket.broadcast.emit('newMessage', {
        //         from: createMessage.from,
        //         text: createMessage.text,
        //         createdAt: new Date().getTime()
        //     });
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started up on port ${port}`);
  });
