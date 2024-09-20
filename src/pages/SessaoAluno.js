import React, { useState, useEffect } from 'react';
import './SessaoAluno.css';

function SessaoAluno({ session, alunoInfo, socket, onVoltar }) {
  const [objetivos, setObjetivos] = useState([]);
  const [cards, setCards] = useState([]);
  const [boosts, setBoosts] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (session && session.teams) {
      const allObjetivos = session.teams.flatMap(team => team.objetivos || []);
      const uniqueObjetivos = [...new Set(allObjetivos.map(obj => {
        if (typeof obj === 'string') return obj;
        if (obj.texto) return obj.texto;
        if (obj.objetivo) return obj.objetivo;
        if (obj.descricao) return obj.descricao;
        return JSON.stringify(obj);
      }))];
      setObjetivos(uniqueObjetivos);
      setCards(session.cards || []);
      setBoosts(session.boosts || []);
    }

    socket.on('sessionUpdate', (updatedSession) => {
      if (updatedSession.id === session.id) {
        const allObjetivos = updatedSession.teams.flatMap(team => team.objetivos || []);
        const uniqueObjetivos = [...new Set(allObjetivos.map(obj => {
          if (typeof obj === 'string') return obj;
          if (obj.texto) return obj.texto;
          if (obj.objetivo) return obj.objetivo;
          if (obj.descricao) return obj.descricao;
          return JSON.stringify(obj);
        }))];
        setObjetivos(uniqueObjetivos);
        setCards(updatedSession.cards || []);
        setBoosts(updatedSession.boosts || []);
      }
    });

    return () => {
      socket.off('sessionUpdate');
    };
  }, [socket, session]);

  const handleEnviarArquivo = (objectiveIndex) => {
    // implementar a função para enviar o arquivo do objetivo.
    console.log(`Enviando arquivo para o objetivo ${objectiveIndex + 1}`);
  };

  if (!session) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="sessao-aluno">
      <div className="aluno-info">
        <span>Nome: {alunoInfo.nome}</span>
        <span>RM: {alunoInfo.rm}</span>
      </div>
      <div className="session-info">
        <span>Sessão: {session.name}</span>
        <span>Pontos: {points}</span>
      </div>
      <div className="content">
        <div className="section">
          <h3>Objetivos:</h3>
          {objetivos.length > 0 ? (
            <ul>
              {objetivos.map((objetivo, index) => (
                <li key={index}>
                  {objetivo}
                  <button onClick={() => handleEnviarArquivo(index)} className="button-small">
                    Enviar Arquivo
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum objetivo encontrado.</p>
          )}
        </div>
        <div className="section">
          <h3>Cards:</h3>
          <ul>
            {cards.filter(card => card.descricao).map((card, index) => (
              <li key={index}>{card.descricao}</li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={onVoltar} className="button-secondary">Voltar</button>
    </div>
  );
}

export default SessaoAluno;