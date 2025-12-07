import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import Booking from './Components/Booking/Booking';
import Information from './Components/Information/Information';
import EnterPassengerDetails from './Components/EnterPassengerDetails/EnterPassengerDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home/>      
              <Main/>
              <Footer />
            </>
          } />
          <Route path="/booking" element={<Booking />} />
          <Route path="/information" element={<Information />} />
          <Route path="/enter-passenger-details" element={<EnterPassengerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
