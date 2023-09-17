import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Aside from './Aside/Aside';
import Board from './Board/Board';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Aside />
      <Board />
      <Footer />
    </div>
  );
}

export default App;
