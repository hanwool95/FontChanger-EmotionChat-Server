
const express = require("express");
const http = require('http');
const PORT = 3737;
const app = express();
const cors = require('cors')


let server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`listening at http://127.0.0.1:${PORT}...`);
});

let socket = require('socket.io')(server,{
    cors: {
        origin : "*",
        credentials: true
    }
});


socket.sockets.on('connection', function(client){
    console.log('Connection!');

    client.on('serverReceiver', ({name, message, emotion, font}) => {
        console.log("message recieved")
        console.log(message)
        socket.sockets.emit('clientReceiver', ({name, message, emotion, font}))
    })
})

