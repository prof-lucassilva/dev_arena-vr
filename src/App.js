import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Professor from './pages/Professor';
import Aluno from './pages/Aluno';
import Painel from './pages/Painel';
import Cadastros from './pages/Cadastros';
import CriarObjetivos from './pages/CriarObjetivos';
import CriarCards from './pages/CriarCards';
import CriarBoosts from './pages/CriarBoosts';
import CriarSessao from './pages/CriarSessao';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/cadastros" element={<Cadastros />} />
        <Route path="/criar-objetivos" element={<CriarObjetivos />} />
        <Route path="/criar-cards" element={<CriarCards />} />
        <Route path="/criar-boosts" element={<CriarBoosts />} />
        <Route path="/criar-sessao" element={<CriarSessao />} />
      </Routes>
    </Router>
  );
}

export default App;