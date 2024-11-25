
import './App.css';
import Register from './pages/Register/Register';
import Stillvideo from './pages/stillvideoE/Stillvideo';
import Login from './pages/Login/Login'
import Homepage from './pages/Homepage/Homepage';
import Imagepg from './pages/Imagepg/Imagepg';
import Stillvideod from './pages/stillvideoD/Stillvideod';
import Livevideo from './pages/Livevideoe/Livevideo';
import Videopg from './pages/Videopg/Videopg';
import Livevideopg from './pages/Livevideo/Livevideo';
import { Route, Routes , BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
  
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="homepage/imagepg" element={<Imagepg />} />
          <Route path="homepage/videopg" element={<Videopg />} />
          <Route path="homepage/livevideopg" element={<Livevideopg />} />
          <Route path="homepage/videopg/videod" element={<Stillvideod />} />
          <Route path="homepage/livevideopg/videod" element={<Stillvideod />} />
          <Route path="homepage/videopg/stillvideo" element={<Stillvideo />} />
          <Route path="homepage/livevideopg/livevideo" element={<Livevideo />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
