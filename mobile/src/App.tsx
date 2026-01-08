import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginScreen } from './features/auth/LoginScreen';
import { VibeSelectionScreen } from './features/vibes/VibeSelectionScreen';

function App() {
  return (
    <Router> {/* O Router deve envolver tudo */}
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/vibes" element={<VibeSelectionScreen />} />
      </Routes>
    </Router>
  );
}

export default App;