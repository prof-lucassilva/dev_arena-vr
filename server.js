const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'build')));

let sessions = [];
let nextSessionId = 1;

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('requestSessions', () => {
    socket.emit('sessionsUpdate', sessions);
  });

  socket.on('createSession', (sessionData) => {
    if (sessions.length < 3) {
      const newSession = {
        id: nextSessionId++,
        name: sessionData.name,
        teams: [
          { id: 1, name: 'Equipe 1', objetivos: sessionData.objetivos.map(obj => typeof obj === 'string' ? { texto: obj } : obj), members: [] },
          { id: 2, name: 'Equipe 2', objetivos: sessionData.objetivos.map(obj => typeof obj === 'string' ? { texto: obj } : obj), members: [] },
          { id: 3, name: 'Equipe 3', objetivos: sessionData.objetivos.map(obj => typeof obj === 'string' ? { texto: obj } : obj), members: [] }
        ],
        cards: sessionData.cards,
        boosts: sessionData.boosts,
        timeRemaining: 0
      };
      console.log('Nova sessão criada:', JSON.stringify(newSession, null, 2));
      sessions.push(newSession);
      io.emit('sessionsUpdate', sessions);
    }
  });

  socket.on('deleteSession', (sessionId) => {
    sessions = sessions.filter(session => session.id !== sessionId);
    io.emit('sessionsUpdate', sessions);
  });

  socket.on('updateSession', (data) => {
    const session = sessions.find(s => s.id === data.sessionId);
    if (session) {
      session.teams.forEach(team => {
        team.objectives = data.objectives;
      });
      session.cards = data.cards;
      session.boosts = data.boosts;
      io.emit('sessionUpdate', session);
    }
  });

  socket.on('updateCards', (data) => {
    const { sessionId, cards } = data;
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      session.cards = cards;
      io.emit('sessionUpdate', session);
    }
  });

  socket.on('updateTime', (data) => {
    const { sessionId, time } = data;
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      session.timeRemaining = time;
      io.emit('sessionUpdate', session);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Adicione esta linha após todas as outras rotas e antes de iniciar o servidor
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));