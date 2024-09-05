import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CriarObjetivos() {
  const navigate = useNavigate();
  const [objetivos, setObjetivos] = useState(['', '', '']);
  const [tempos, setTempos] = useState(['', '', '']);

  const handleObjetivoChange = (index, value) => {
    const newObjetivos = [...objetivos];
    newObjetivos[index] = value;
    setObjetivos(newObjetivos);
  };

  const handleTempoChange = (index, value) => {
    const newTempos = [...tempos];
    newTempos[index] = value;
    setTempos(newTempos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const objetivosComTempos = objetivos.map((obj, index) => ({
      objetivo: obj,
      tempo: parseInt(tempos[index]) || 0
    }));
    localStorage.setItem('objetivos', JSON.stringify(objetivosComTempos));
    
    window.dispatchEvent(new Event('storage'));
    
    navigate('/cadastros');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Criar Objetivos</h2>
        <form onSubmit={handleSubmit}>
          {[0, 1, 2].map((index) => (
            <div key={index} className="objetivo-container">
              <input
                type="text"
                value={objetivos[index]}
                onChange={(e) => handleObjetivoChange(index, e.target.value)}
                placeholder={`Objetivo ${index + 1}`}
                className="App-input"
              />
              <input
                type="number"
                value={tempos[index]}
                onChange={(e) => handleTempoChange(index, e.target.value)}
                placeholder="Tempo (min)"
                className="App-input App-input-small"
              />
            </div>
          ))}
          <button type="submit" className="App-button">Salvar Objetivos</button>
        </form>
        <button onClick={() => navigate('/cadastros')} className="App-button App-button-secondary">Voltar</button>
      </header>
    </div>
  );
}

export default CriarObjetivos;