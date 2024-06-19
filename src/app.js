const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes.js');
const { getNextTicket, getLastThreeTickets, getTicketsByDay } = require('./controllers/ticketController.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.static('public'));
app.use('/api/tickets', ticketRoutes);

server.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.emit('last-three-tickets', getLastThreeTickets());
  socket.emit('tickets-by-day', getTicketsByDay());

  socket.on('get-next-ticket', () => {
    const nextTicket = getNextTicket();
    socket.emit('ticket-called', nextTicket);
    io.emit('last-three-tickets', getLastThreeTickets());
    io.emit('tickets-by-day', getTicketsByDay());
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
