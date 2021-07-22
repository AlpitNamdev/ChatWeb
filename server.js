const express = require('express')

const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 4000

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})


// Socket

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('connected..')

    socket.on('message',(msg) => {
        // console.log(msg , 'hello')
        socket.broadcast.emit('message',msg)
    })
    
})



http.listen(PORT, () => {
    console.log(`listening on  port ${PORT}`)
})