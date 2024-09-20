import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarSessao({ socket }) {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [objectives, setObjectives] = useState([[], [], []]);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState('');

  useEffect(() => {
    socket.emit('requestSessionDetails', parseInt(sessionId));

    socket.on('sessionDetails', (sessionData) => {
      setSession(sessionData);
      setObjectives(sessionData.teams.map(team => team.objectives));
      setCards(sessionData.cards);
    });

    return () => {
      socket.off('sessionDetails');
    };
  }, [socket, sessionId]);

  const handleObjectiveChange = (teamIndex, objIndex, value) => {
    const newObjectives = [...objectives];
    newObjectives[teamIndex][objIndex] = value;
    setObjectives(newObjectives);
  };

  const handleAddCard = () => {
    if (newCard.trim()) {
      setCards([...cards, newCard.trim()]);
      setNewCard('');
    }
  };

  const handleRemoveCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    socket.emit('updateSession', {
      sessionId: parseInt(sessionId),
      objectives,
      cards
    });
    navigate('/professor');
  };

  if (!session) return <div>Carregando...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h2>Editar Sessão: {session.name}</h2>
        {session.teams.map((team, teamIndex) => (
          <div key={team.id}>
            <h3>{team.name}</h3>
            {[0, 1, 2].map((objIndex) => (
              <input
                key={objIndex}
                type="text"
                value={objectives[teamIndex][objIndex] || ''}
                onChange={(e) => handleObjectiveChange(teamIndex, objIndex, e.target.value)}
                placeholder={`Objetivo ${objIndex + 1}`}
                className="App-input"
              />
            ))}
          </div>
        ))}
        <h3>Cards</h3>
        <div>
          <input
            type="text"
            value={newCard}
            onChange={(e) => setNewCard(e.target.value)}
            placeholder="Novo card"
            className="App-input"
          />
          <button onClick={handleAddCard} className="App-button">Adicionar Card</button>
        </div>
        {cards.map((card, index) => (
          <div key={index} className="card-item">
            <span>{card}</span>
            <button onClick={() => handleRemoveCard(index)} className="App-button-small">Remover</button>
          </div>
        ))}
        <button onClick={handleSave} className="App-button">Salvar Alterações</button>
        <button onClick={() => navigate('/professor')} className="App-button App-button-secondary">Voltar</button>
      </header>
    </div>
  );
}

export default EditarSessao;