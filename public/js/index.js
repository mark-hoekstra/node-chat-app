var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disonnected from server');
});

socket.on('newMessage', function (newMessage) {
    var formattedTime = moment(newMessage.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: newMessage.from,
        text: newMessage.text,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (newLocationMessage) {
    var formattedTime = moment(newLocationMessage.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: newLocationMessage.from,
        text: newLocationMessage.text,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
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