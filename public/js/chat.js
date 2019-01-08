let socket = io();

function scrollToBottom(){
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
        console.log('Should scroll');
    }
}
socket.on('connect', () => {
    let params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if(err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
    let ol = jQuery('<ol></ol>');
    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    //let li = jQuery('<li></li>');
    //li.text(`${message.from} ${formattedTime}: ${message.text}`);
    let template = jQuery('#message-template').html();
    Mustache.parse(template);
    let html = Mustache.render(template, {
        text: message.text,
        createdAt: formattedTime,
        from: message.from
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    //let li = jQuery('<li></li>');
    //let a = jQuery('<a target="_blank">My current location</a>');
    //li.text(`${message.from} ${formattedTime}: `);
    //a.attr('href', message.url);
    //li.append(a);
    let template = jQuery('#location-template').html();
    Mustache.parse(template);
    let html = Mustache.render(template, {
        createdAt: formattedTime,
        from: message.from,
        url: message.url
    });
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    let messageField = jQuery('[name=message]');
    console.log(messageField.val())
    socket.emit('createMessage', {
        text: messageField.val()
    }, function (data) {
        messageField.val('');
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by the browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});