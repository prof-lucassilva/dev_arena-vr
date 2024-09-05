import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CriarBoosts() {
  const navigate = useNavigate();
  const [boosts, setBoosts] = useState([
    { id: 1, pergunta: '' },
    { id: 2, pergunta: '' },
    { id: 3, pergunta: '' },
    { id: 4, pergunta: '' },
    { id: 5, pergunta: '' },
  ]);

  useEffect(() => {
    const savedBoosts = JSON.parse(localStorage.getItem('boosts') || '[]');
    if (savedBoosts.length > 0) {
      setBoosts(savedBoosts);
    }
  }, []);

  const handleBoostChange = (id, value) => {
    setBoosts(boosts.map(boost => boost.id === id ? { ...boost, pergunta: value } : boost));
  };

  const addBoost = () => {
    const newId = Math.max(...boosts.map(boost => boost.id), 0) + 1;
    setBoosts([...boosts, { id: newId, pergunta: '' }]);
  };

  const removeBoost = (id) => {
    if (boosts.length > 1) {
      setBoosts(boosts.filter(boost => boost.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('boosts', JSON.stringify(boosts));
    alert('Perguntas Boost salvas com sucesso!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Criar Perguntas Boost</h2>
        <form onSubmit={handleSubmit}>
          {boosts.map((boost, index) => (
            <div key={boost.id} className="boost-input-container">
              <label htmlFor={`boost-${boost.id}`}>Boost - {String(index + 1).padStart(2, '0')}</label>
              <input
                id={`boost-${boost.id}`}
                type="text"
                value={boost.pergunta}
                onChange={(e) => handleBoostChange(boost.id, e.target.value)}
                placeholder="Digite a pergunta boost"
                className="App-input"
              />
              <button type="button" onClick={() => removeBoost(boost.id)} className="App-button-small">-</button>
            </div>
          ))}
          <button type="button" onClick={addBoost} className="App-button">+ Adicionar Pergunta Boost</button>
          <button type="submit" className="App-button">Salvar Perguntas Boost</button>
        </form>
        <button onClick={() => navigate('/cadastros')} className="App-button App-button-secondary">Voltar</button>
      </header>
    </div>
  );
}

export default CriarBoosts;