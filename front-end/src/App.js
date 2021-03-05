import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavRouter from './components/NavRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { useHistory } from "react-router-dom";

import { refreshToken } from "./services/tokenApi";
import { userSigninSignup } from './redux/user/user.actions';


function App() {
  const dispatch = useDispatch();
  const [path, setPath] = useState("");
  const history = useHistory();
  const userInfo = useSelector(state => state.user.userInfo);
  const { userType, authId, accessToken, accessExpiresIn, refreshExpiresIn} = userInfo;
  const [localStorageUserInfo, setLocalStorageUserInfo] = useState(JSON.parse(window.localStorage.getItem("PivotCareUser")))


  useEffect(() => {
    const unregisterHistoryListener = history.listen((location, action) => {
      // console.log(action, location.pathname, location.state)
      setPath(location.pathname);

      // Check Token expiry HERE!!!!
      const now = new Date().getTime();
      // console.log(new Date().getTime());
      // console.log(now > accessExpiresIn);
      // console.log(now > accessExpiresIn);
      // console.log(now < refreshExpiresIn);
      // console.log(accessExpiresIn);
      if(accessExpiresIn < now && now < refreshExpiresIn) {
        refreshToken().then(response=>{
          if(response){
            // console.log(response.response.ok);

            const {
              userType,
              authId,
              accessToken,
              refreshToken,
              accessExpiresIn,
              refreshExpiresIn
          } = response.body;
  
            dispatch(
                userSigninSignup(
                  userType,
                  authId,
                  accessToken,
                  refreshToken,
                  accessExpiresIn,
                  refreshExpiresIn
                )
            );
            }
        })
      }
    });
    return () => {
      unregisterHistoryListener();
    }
  }, [accessToken])

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        setPath(history.location.pathname);
      }
    }
  }, [window.performance])

  return (
    <main className="App">
      {
        path.includes("auth")
        &&
        new Date().getTime() < accessExpiresIn
        ? null :
          <Header />
      }
      <NavRouter />
      <Footer />
    </main>
  );
}

export default App;
