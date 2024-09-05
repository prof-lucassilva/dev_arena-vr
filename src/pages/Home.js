import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../logo.svg';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Arena VR Logo" className="App-logo" />
        <h2>Arena VR</h2>
        <p>Escolha uma opção:</p>
        <div>
          <Link to="/professor" className="App-button">Professor</Link>
          <Link to="/aluno" className="App-button">Aluno</Link>
          <Link to="/painel" className="App-button">Painel</Link>
        </div>
      </header>
    </div>
  );
}

export default Home;