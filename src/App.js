import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrowseHotels from './Components/BrowseHotels';
import Home from './Components/Home';
import HotelDetails from './Components/HotelDetails';

function App() {
  return (
    <Router>
      <div>
        <nav className="fixed-navigation">
          <img className="logo" src="./Assets/logo.png" alt="Logo" />
          <ul className="nav-links">
            <li><a className="nav-link" href="/">Home</a></li>
            <li><a className="nav-link" href="/browse">Find offers</a></li>
            <li><a className="nav-link" href="#">Add new offers</a></li>
            <li><a className="nav-link" href="#">My offers</a></li>
            <li><a className="nav-link" href="#">Favourites</a></li>
            <button className="button primary">Log out</button>
          </ul>
          <button className="button primary hidden">Menu</button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseHotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
