import React from 'react';

function SelecionarSessao({ sessions, onSelectSession, onVoltar }) {
  return (
    <div>
      <h2>Selecione uma Sessão</h2>
      {sessions.map((session) => (
        <button 
          key={session.id} 
          onClick={() => onSelectSession(session)}
          className="App-button"
        >
          {session.name}
        </button>
      ))}
      <button onClick={onVoltar} className="App-button App-button-secondary">Voltar</button>
    </div>
  );
}

export default SelecionarSessao;