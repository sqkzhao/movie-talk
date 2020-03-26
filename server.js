const express = require('express');
const cors = require('cors');
const app = express();

require("./server/config/mongoose.config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app);

const server = app.listen(8000, () => {
    console.log("Listening at Port 8000")
});

// SOCKET
const io = require("socket.io")(server)
const chat = []

io.on("connection", socket => {
    console.log("Socket established")
    socket.emit("welcome", "welcome from the server")

    // NOT WORKING
    socket.on("new_msg", msg => {
        console.log("received...")
        chat.push(msg)
        console.log(msg)
        io.emit("chat_history", chat)
    })


})