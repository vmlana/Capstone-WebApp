export const userActionTypes = {
    USER_SIGNIN_SIGNUP: "USER_SIGNIN_SIGNUP",
    USER_LOGOUT: "USER_LOGOUT",
    USER_INITIALIZE: "USER_INITIALIZE",
  };
  
  export const userInitialize = () => ({
    type: userActionTypes.USER_INITIALIZE,
  });
  
  export const userSigninSignup = (userType, authId, accessToken, refreshToken, accessExpiresIn, refreshExpiresIn) => ({
    type: userActionTypes.USER_SIGNIN_SIGNUP,
    payload: {userType: userType, authId: authId, accessToken: accessToken, refreshToken: refreshToken, accessExpiresIn: accessExpiresIn, refreshExpiresIn: refreshExpiresIn}
  });
  
  export const userLogout = () => ({
    type: userActionTypes.USER_LOGOUT,
  });
