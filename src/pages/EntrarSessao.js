import React, { useState } from 'react';

function EntrarSessao({ onEntrar, onVoltar }) {
  const [nome, setNome] = useState('');
  const [rm, setRm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome && rm) {
      onEntrar({ nome, rm });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div>
      <h2>Entrar na Sessão</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          className="App-input"
        />
        <input
          type="text"
          value={rm}
          onChange={(e) => setRm(e.target.value)}
          placeholder="RM"
          className="App-input"
        />
        <button type="submit" className="App-button">Iniciar</button>
      </form>
      <button onClick={onVoltar} className="App-button App-button-secondary">Voltar</button>
    </div>
  );
}

export default EntrarSessao;