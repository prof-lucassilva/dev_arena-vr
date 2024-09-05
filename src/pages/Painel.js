import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Painel() {
  const navigate = useNavigate();
  const [objetivos, setObjetivos] = useState([]);
  const [tempoRestante, setTempoRestante] = useState(0);

  useEffect(() => {
    const carregarObjetivos = () => {
      const objetivosArmazenados = JSON.parse(localStorage.getItem('objetivos') || '[]');
      setObjetivos(objetivosArmazenados);
      const total = objetivosArmazenados.reduce((acc, obj) => acc + obj.tempo, 0);
      setTempoRestante(total * 60);
    };

    carregarObjetivos();

    const intervalo = setInterval(() => {
      setTempoRestante((tempo) => (tempo > 0 ? tempo - 1 : 0));
    }, 1000);

    const handleStorageChange = (e) => {
      if (e.key === 'objetivos') {
        carregarObjetivos();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(intervalo);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="tempo-display">
          <h3 className="tempo-label">TEMPO</h3>
          <p className="tempo-total">{formatarTempo(tempoRestante)}</p>
        </div>
        <div className="objetivos-list">
          <h3>Objetivos:</h3>
          {objetivos.map((obj, index) => (
            <p key={index}>{obj.objetivo} - {obj.tempo} minutos</p>
          ))}
        </div>
        <button onClick={() => navigate('/')} className="App-button">Voltar para Home</button>
      </header>
    </div>
  );
}

export default Painel;