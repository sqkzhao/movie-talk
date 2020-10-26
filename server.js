const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

require("./server/config/mongoose.config");
require('dotenv').config();

app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app);

const server = app.listen(8000, ()=> {
    console.log("connecting to port 8000")
})

// SOCKET
// const io = require("socket.io")(server)
// set up socket.io
const io = require("socket.io")(server, {
    path: '/websockets', // path to make requests to [http://host/websockets]
    maxHttpBufferSize: 1024, // max message payload size (prevents clients from sending gigabytes of data)
    pingInterval: 60 * 1000, // 1 minute
    pingTimeout: 4 * 60 * 1000 // 4 minutes
});
const chat = []

io.of(`/dropcodes`).on("connection", socket => {
    socket.emit("welcome", "welcome from the server!")

    socket.on("send_msg", msg => {
        chat.push(msg)
        io.emit("new_msg", chat)
    })
})