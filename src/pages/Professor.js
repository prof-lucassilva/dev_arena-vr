import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Professor() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Credenciais definidas no código
  const validUsername = 'professor';
  const validPassword = 'senha123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  const handleVoltar = () => {
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Login do Professor</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="App-input"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="App-input"
            />
            <button type="submit" className="App-button">Entrar</button>
          <button onClick={handleVoltar} className="App-button App-button-secondary">Voltar</button>
          </form>
          {error && <p className="App-error">{error}</p>}
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Página do Professor</h2>
        <div>
          <Link to="/criar-sessao" className="App-button">Criar Sessão</Link>
          <Link to="/entrar-sessao" className="App-button">Entrar na Sessão</Link>
        </div>
        <button onClick={handleVoltar} className="App-button App-button-secondary">Voltar</button>
      </header>
    </div>
  );
}

export default Professor;