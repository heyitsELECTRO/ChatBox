require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const socketIO = require('socket.io');
const Message = require('./models/Message');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

io.on('connection', socket => {
  socket.on('joinRoom', room => socket.join(room));

  socket.on('sendMessage', async ({ room, content, userId, username }) => {
    const message = await Message.create({ room, content, sender: userId });
    io.to(room).emit('newMessage', {
      id: message._id,
      content: message.content,
      sender: message.sender,
      username,
      timestamp: message.timestamp
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server on port ${PORT}`));
