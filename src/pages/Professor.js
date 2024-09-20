import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorageData } from '../utils/localStorage';

function Professor({ socket }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sessions, setSessions] = useState([]);
  const [newSessionName, setNewSessionName] = useState('');

  useEffect(() => {
    socket.on('sessionsUpdate', (updatedSessions) => {
      setSessions(updatedSessions);
    });

    return () => {
      socket.off('sessionsUpdate');
    };
  }, [socket]);

  useEffect(() => {
    if (isLoggedIn) {
      socket.emit('requestSessions');
    }
  }, [isLoggedIn, socket]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'professor' && password === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const handleCreateSession = () => {
    if (sessions.length < 3) {
      if (newSessionName.trim()) {
        const { objetivos, cards, boosts } = getLocalStorageData();
        socket.emit('createSession', { name: newSessionName, objetivos, cards, boosts });
        setNewSessionName('');
      } else {
        alert('Por favor, insira um nome para a sessão');
      }
    } else {
      alert('Limite máximo de 3 sessões atingido');
    }
  };

  const handleDeleteSession = (sessionId) => {
    socket.emit('deleteSession', sessionId);
  };

  const handleEditSession = (sessionId) => {
    navigate(`/editar-sessao/${sessionId}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Login do Professor</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              className="App-input"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="App-input"
            />
            <button type="submit" className="App-button">Entrar</button>
          </form>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Painel do Professor</h2>
        <div>
          <input
            type="text"
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.target.value)}
            placeholder="Nome da nova sessão"
            className="App-input"
          />
          <button onClick={handleCreateSession} className="App-button">Criar Sessão</button>
        </div>
        <h3>Sessões Ativas:</h3>
        {sessions.map((session) => (
          <div key={session.id} className="session-item">
            <span>{session.name}</span>
            <button onClick={() => handleEditSession(session.id)} className="App-button">Editar</button>
            <button onClick={() => handleDeleteSession(session.id)} className="App-button App-button-secondary">Excluir</button>
          </div>
        ))}
        <button onClick={() => navigate('/')} className="App-button App-button-secondary">Voltar</button>
      </header>
    </div>
  );
}

export default Professor;