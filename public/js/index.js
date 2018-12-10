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
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

var locationButton = jQuery('#geolocation');

locationButton.on('click', function () {
    if ("geolocation" in navigator) {
        locationButton.attr('disabled', 'disabled').text('Sending');
        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Share location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, function () {
            locationButton.removeAttr('disabled').text('Share location');
            alert('Unable to fetch your geolocation')
        });
    } else {
        return alert('Geolocation not supported by your browser.')
    }


});