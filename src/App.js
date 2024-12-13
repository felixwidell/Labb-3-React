import Booking from './pages/Booking'
import Home from './pages/Home';
import {Route, Routes } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>


  );
}

export default App;
