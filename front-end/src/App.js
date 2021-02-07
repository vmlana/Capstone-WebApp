import './App.css';
import React from 'react';
import NavRouter from './components/NavRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <main className="App">
      <Header />
      <NavRouter />
      <Footer />
    </main>
  );
}

export default App;
