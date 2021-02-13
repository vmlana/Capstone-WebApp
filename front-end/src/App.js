// import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavRouter from './components/NavRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { useHistory } from "react-router-dom";

function App() {
  const [path, setPath] = useState("");
  const history = useHistory();
  const userInfo = useSelector(state => state.user.userInfo);
  const {userType, authId, token} = userInfo;


  useEffect(()=>{
    const unregisterHistoryListener = history.listen((location, action) => {
      // console.log(action, location.pathname, location.state)
      setPath(location.pathname);
    });
    return () => {
      unregisterHistoryListener();
    }
  },[])
  
  return (
    <main className="App">
      {
        path.includes("auth") && token
        ? null :
        <Header />
      }
      <NavRouter />
      <Footer />
    </main>
  );
}

export default App;
