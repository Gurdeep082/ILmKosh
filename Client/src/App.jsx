import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Register from './pages/register';
import Hero from './Main';
import Bookshelf from './pages/bookshelf/bookshelf';
import Fiction from './pages/bookshelf/genres/fiction';
import Mystery from './pages/bookshelf/genres/mystery';
import SciFi from './pages/bookshelf/genres/sci-fi';
import Romance from './pages/bookshelf/genres/romance';
import Biography from './pages/bookshelf/genres/biography';
import History from './pages/bookshelf/genres/history';
import Philosophy from './pages/bookshelf/genres/philosophy';
import Poetry from './pages/bookshelf/genres/poetry';
import New from './new';
import UploadBook from './pages/UploadBook';
import Login from './pages/login';


function App() {
  return (
    <Router>
      <Navbar />
      <div className='mainDiv'>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadBook />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
          <Route path="/genre/fiction" element={<Fiction />} />
          <Route path="/genre/mystery" element={<Mystery />} />
          <Route path="/genre/sci-fi" element={<SciFi />} />
          <Route path="/genre/romance" element={<Romance />} />
          <Route path="/genre/biography" element={<Biography />} />
          <Route path="/genre/history" element={<History />} />
          <Route path="/genre/philosophy" element={<Philosophy />} />
          <Route path="/genre/poetry" element={<Poetry />} />
          <Route path="/new" element={<New />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;