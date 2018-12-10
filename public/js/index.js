var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disonnected from server');
});

socket.on('newMessage', function (newMessage) {
    console.log('New message from the server:', newMessage);
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (newLocationMessage) {
    console.log('New message from the server:', newLocationMessage);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${newLocationMessage.from}: `);
    a.attr('href', newLocationMessage.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

var locationButton = jQuery('#geolocation');

locationButton.on('click', function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, function () {
            alert('Unable to fetch your geolocation')
        });
      } else {
        return alert('Geolocation not supported by your browser.')
      }
});