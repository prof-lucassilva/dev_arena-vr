import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import socket from './socket';
import Home from './pages/Home';
import Professor from './pages/Professor';
import Aluno from './pages/Aluno';
import Painel from './pages/Painel';
import EditarSessao from './pages/EditarSessao';
import Cadastros from './pages/Cadastros';
import CriarSessao from './pages/CriarSessao';
import CriarObjetivos from './pages/CriarObjetivos';
import CriarCards from './pages/CriarCards';
import CriarBoosts from './pages/CriarBoosts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professor" element={<Professor socket={socket} />} />
        <Route path="/aluno" element={<Aluno socket={socket} />} />
        <Route path="/painel" element={<Painel socket={socket} />} />
        <Route path="/editar-sessao/:sessionId" element={<EditarSessao socket={socket} />} />
        <Route path="/cadastros" element={<Cadastros />} />
        <Route path="/criar-sessao" element={<CriarSessao socket={socket} />} />
        <Route path="/criar-objetivos" element={<CriarObjetivos socket={socket} />} />
        <Route path="/criar-cards" element={<CriarCards socket={socket} />} />
        <Route path="/criar-boosts" element={<CriarBoosts socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;