import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import BrowseHotels from './Components/BrowseHotels';
import Home from './Components/Home';
import HotelDetails from './Components/HotelDetails';
import Login from './Components/Login';
import { logout, useUser } from './Data/userService';
import { CartProvider } from './Data/CartContext';
import Chat from './Components/Chat'; 
import { ChatProvider } from './Data/ChatContext';

function App() {
  const user = useUser();

  return (
    <CartProvider>
      <ChatProvider>
        <Router>
          <div>
            <nav className="fixed-navigation">
              <img className="logo" src="./Assets/logo.png" alt="Logo" />
              <ul className="nav-links">
                <li><NavLink className="nav-link" to="/">Home</NavLink></li>
                <li><NavLink className="nav-link" to="/browse">Find offers</NavLink></li>
                <li><NavLink className="nav-link" to="/chat">Chat</NavLink></li>
                {!user ? (
                  <li><NavLink className="button primary nav-link" to="/login">Log in</NavLink></li>
                ) : (
                  <li>
                    <button className="button primary nav-link" onClick={logout}>
                      Log out {user.displayName}
                    </button>
                  </li>
                )}
              </ul>
              <button className="button primary hidden">Menu</button>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<BrowseHotels />} />
              <Route path="/hotels/:id" element={<HotelDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<Chat />} /> 
            </Routes>
          </div>
        </Router>
      </ChatProvider>
    </CartProvider>
  );
}

export default App;