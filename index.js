const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 7867;
app.set('view engine', 'ejs');


app.get('/',function(req,res){
    (
        res.render('index')
    )
});


io.on('connection', (socket) => {
    console.log(socket.id + ' is connected');
    socket.on('disconnect', () => {
        console.log(socket.id + ' is disconnected');
    });
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log(socket.id + ' says: ' + msg);
        io.emit('chat message', msg);
    });
});

io.on("connection", (socket) => {
    socket.join("qwertY");
    console.log(socket.id + " has joined the room!");
  });

server.listen(port, () => {
    console.log(`Server listening at: ` + port);
});