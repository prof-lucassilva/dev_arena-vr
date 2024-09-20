import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SelecionarSessao from './SelecionarSessao';
import EntrarSessao from './EntrarSessao';
import SessaoAluno from './SessaoAluno';

function Aluno({ socket }) {
  const [step, setStep] = useState('selecionar');
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [alunoInfo, setAlunoInfo] = useState({ nome: '', rm: '' });
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('requestSessions');
    socket.on('sessionsUpdate', (updatedSessions) => {
      setSessions(updatedSessions);
    });

    return () => {
      socket.off('sessionsUpdate');
    };
  }, [socket]);

  const handleSelectSession = (session) => {
    setSelectedSession(session);
    setStep('entrar');
  };

  const handleEntrarSessao = (info) => {
    setAlunoInfo(info);
    setStep('sessao');
    socket.emit('joinSession', { sessionId: selectedSession.id, ...info });
  };

  const handleVoltar = () => {
    if (step === 'entrar') {
      setStep('selecionar');
    } else if (step === 'sessao') {
      setStep('entrar');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {step === 'selecionar' && (
          <SelecionarSessao 
            sessions={sessions} 
            onSelectSession={handleSelectSession} 
            onVoltar={handleVoltar}
          />
        )}
        {step === 'entrar' && (
          <EntrarSessao 
            onEntrar={handleEntrarSessao} 
            onVoltar={handleVoltar}
          />
        )}
        {step === 'sessao' && selectedSession && (
          <SessaoAluno 
            session={selectedSession} 
            alunoInfo={alunoInfo} 
            socket={socket}
            onVoltar={handleVoltar}
          />
        )}
      </header>
    </div>
  );
}

export default Aluno;