import React from 'react';
import { useNavigate } from 'react-router-dom';

function CriarSessao() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h2>Criar Sessão</h2>
        {/* Adicione o formulário ou conteúdo para criar sessão aqui */}
        <button onClick={() => navigate('/cadastros')} className="App-button">Voltar</button>
      </header>
    </div>
  );
}

export default CriarSessao;