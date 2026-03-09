const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const Chat = require('./models/chat');

const connect = require('./config/database-config');

io.on('connection', (socket) => {
  // console.log('a user connected' , socket.id);

  socket.on('join_room', (data)=> {
    console.log('joining a room');
    // console.log(data.roomid);
    socket.join(data.roomid);
    // console.log("joined a room",data.roomid);
    
  });

  socket.on('msg_send', async (data)=> {
    console.log(data);
    const chat = await Chat.create({
      roomId:data.roomid,
      user: data.username,
      content: data.msg
    });
    io.to(data.roomid).emit('msg_received',data);
  });

  socket.on('typing',(data)=> {
    socket.broadcast.to(data.roomid).emit('someonetyping');
  })


 
});
app.set('view engine', 'ejs');
app.use('/',express.static(__dirname + '/public'));

app.get('/chat/:roomid', async (req,res)=> {
  const chats = await Chat.find({
    roomId: req.params.roomid
  }).select('content user');
  res.render('index',{
    name:'jassi',
    id: req.params.roomid,
    chats: chats
  });
});



server.listen(3000, async ()=> {
    console.log('Server started');
    await connect();
    console.log('mongodb connected');
});