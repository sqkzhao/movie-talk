const express = require("express")
const cors = require('cors');
const app = express()

require("./server/config/mongoose.config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app);

const server = app.listen(8000, ()=> {
    console.log("connecting to port 8000")
})

const io = require("socket.io")(server)
const chat = []

io.on("connection", socket => {
    console.log("Nice to meet you. (shake hand) ", socket.id)
    socket.emit("welcome", "welcome from the server!")

    socket.on("send_msg", msg => {
        chat.push(msg)
        io.emit("new_msg", chat)
    })
})