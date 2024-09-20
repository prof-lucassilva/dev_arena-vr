import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeamSelection({ socket }) {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('sessionUpdate', (state) => {
      setTeams(state.teams);
    });

    return () => {
      socket.off('sessionUpdate');
    };
  }, [socket]);

  const joinTeam = (teamId) => {
    if (name) {
      socket.emit('joinTeam', { teamId, memberName: name });
      navigate(`/equipe/${teamId}`);
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Selecione sua Equipe</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="App-input"
        />
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => joinTeam(team.id)}
            className="App-button"
            disabled={team.members.length >= 5}
          >
            {team.name} ({team.members.length}/5)
          </button>
        ))}
      </header>
    </div>
  );
}

export default TeamSelection;