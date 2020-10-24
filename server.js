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
const io = require("socket.io")(server)
const chat = []

io.on("connection", socket => {
    socket.emit("welcome", "welcome from the server!")

    socket.on("send_msg", msg => {
        chat.push(msg)
        io.emit("new_msg", chat)
    })
})