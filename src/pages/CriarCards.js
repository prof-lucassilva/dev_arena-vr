import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CriarCards() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    { id: 1, descricao: '' },
    { id: 2, descricao: '' },
    { id: 3, descricao: '' },
    { id: 4, descricao: '' },
    { id: 5, descricao: '' },
  ]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('cards') || '[]');
    if (savedCards.length > 0) {
      setCards(savedCards);
    }
  }, []);

  const handleCardChange = (id, value) => {
    setCards(cards.map(card => card.id === id ? { ...card, descricao: value } : card));
  };

  const addCard = () => {
    const newId = Math.max(...cards.map(card => card.id), 0) + 1;
    setCards([...cards, { id: newId, descricao: '' }]);
  };

  const removeCard = (id) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('cards', JSON.stringify(cards));
    alert('Cards salvos com sucesso!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Criar Cards</h2>
        <form onSubmit={handleSubmit}>
          {cards.map((card, index) => (
            <div key={card.id} className="card-input-container">
              <label htmlFor={`card-${card.id}`}>Card - {String(index + 1).padStart(2, '0')}</label>
              <input
                id={`card-${card.id}`}
                type="text"
                value={card.descricao}
                onChange={(e) => handleCardChange(card.id, e.target.value)}
                placeholder="Descrição do CARD"
                className="App-input"
              />
              <button type="button" onClick={() => removeCard(card.id)} className="App-button-small">-</button>
            </div>
          ))}
          <button type="button" onClick={addCard} className="App-button">+ Adicionar Card</button>
          <button type="submit" className="App-button">Salvar Cards</button>
        </form>
        <button onClick={() => navigate('/cadastros')} className="App-button App-button-secondary">Voltar</button>
      </header>
    </div>
  );
}

export default CriarCards;