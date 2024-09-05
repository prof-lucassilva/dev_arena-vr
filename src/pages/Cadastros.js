import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Cadastros() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Cadastros</h2>
        <div className="App-button-container">
          <Link to="/criar-sessao" className="App-button">Criar Sessão</Link>
          <Link to="/criar-objetivos" className="App-button">Criar Objetivos</Link>
          <Link to="/criar-cards" className="App-button">Criar Cards</Link>
          <Link to="/criar-boosts" className="App-button">Criar Boosts</Link>
        </div>
        <button onClick={handleVoltar} className="App-button App-button-secondary">Voltar</button>
      </header>
    </div>
  );
}

export default Cadastros;