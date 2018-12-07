var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        to: 'Mark',
        text: 'Let\'s go for 12'
    })
});

socket.on('disconnect', function () {
    console.log('Disonnected from server');
});

socket.on('newMessage', function (newMessage) {
    console.log('New message from the server:', newMessage);
});

