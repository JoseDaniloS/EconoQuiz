import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameScreen from './pages/GameScreen'
import NotFound from './pages/NotFound'
import AudioPlayer from './routes/AudioPlayer'
import './index.css'

function App() {
  return (
    <Router>
      <AudioPlayer />  {}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
 
}

export default App