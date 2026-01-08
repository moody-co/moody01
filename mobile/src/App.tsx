import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginScreen } from './features/auth/LoginScreen';
import { VibeSelectionScreen } from './features/vibes/VibeSelectionScreen';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota inicial: Login */}
        <Route path="/" element={<LoginScreen />} />
        
        {/* Rota de Seleção de Vibes */}
        <Route path="/vibes" element={<VibeSelectionScreen />} />
      </Routes>
    </Router>
  );
}

export default App;