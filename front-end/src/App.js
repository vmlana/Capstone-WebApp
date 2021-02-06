import './App.css';
import NavRouter from './components/NavRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <NavRouter />
      <Footer />
    </div>
  );
}

export default App;
