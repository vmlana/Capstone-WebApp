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
  const [localStorageUserInfo, setLocalStorageUserInfo] = useState(JSON.parse(window.localStorage.getItem("PivotCareUser")))
  const { accessToken, accessExpiresIn, refreshExpiresIn} = userInfo;

  useEffect(()=>{
    if (localStorageUserInfo !== null) {
        const localUserType = localStorageUserInfo.userType;
        const localAuthId = localStorageUserInfo.authId;
        const localAccessToken = localStorageUserInfo.accessToken;
        const localRefreshToken = localStorageUserInfo.refreshToken;
        const localAccessExpiresIn = localStorageUserInfo.accessExpiresIn;
        const localRefreshExpiresIn = localStorageUserInfo.refreshExpiresIn;

        dispatch(
            userSigninSignup(
                localUserType,
                localAuthId,
                localAccessToken,
                localRefreshToken,
                localAccessExpiresIn,
                localRefreshExpiresIn
            )
        );
    }
}, [localStorageUserInfo, dispatch])

  // useEffect(() => {
    // const unregisterHistoryListener = history.listen((location, action) => {
    //   // console.log(action, location.pathname, location.state)
    //   setPath(location.pathname);

    //   // Check Token expiry HERE!!!!
    //   const now = new Date().getTime();
    //   if(accessExpiresIn < now && now < refreshExpiresIn) {
    //     refreshToken().then(response=>{
    //       if(response){

    //         const {
    //           userType,
    //           authId,
    //           accessToken,
    //           refreshToken,
    //           accessExpiresIn,
    //           refreshExpiresIn
    //       } = response.body;
  
    //         dispatch(
    //             userSigninSignup(
    //               userType,
    //               authId,
    //               accessToken,
    //               refreshToken,
    //               accessExpiresIn,
    //               refreshExpiresIn
    //             )
    //         );
    //         }
    //     })
    //   }
    // });
    // return () => {
    //   unregisterHistoryListener();
    // }
  // }, [accessToken, dispatch])

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        setPath(history.location.pathname);
      }
    }

    const unregisterHistoryListener = history.listen((location, action) => {
      // console.log(action, location.pathname, location.state)
      setPath(location.pathname);

      // Check Token expiry HERE!!!!
      const now = new Date().getTime();
      if(accessExpiresIn < now && now < refreshExpiresIn) {
        refreshToken().then(response=>{
          if(response){

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
  }, [window.performance, accessToken, dispatch])

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
