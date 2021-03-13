import { userActionTypes } from './user.actions';

let INITIAL_STATE ;

const storedTokens = window.localStorage.getItem('PivotCareUser');
JSON.parse(storedTokens);
// console.log("storedTokens", JSON.parse(storedTokens));
if(storedTokens != null) {
  INITIAL_STATE = {userInfo: JSON.parse(storedTokens)};
} else {
  INITIAL_STATE = {
    userInfo: {
      userType: "guest",
      authId: null,
      accessToken: null,
      refreshToken: null,
      accessExpiresIn: null,
      refreshExpiresIn: null
    }
  };
}

// const INITIAL_STATE = {
//   userInfo: {
//     userType: "guest",
//     authId: null,
//     accessToken: null,
//     refreshToken: null,
//     accessExpiresIn: null,
//     refreshExpiresIn: null
//   }
// };


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case userActionTypes.USER_SIGNIN_SIGNUP:
        const {userType, authId, accessToken, refreshToken, accessExpiresIn, refreshExpiresIn} = action.payload;
        const pivotCareUser = {
          userType,
          authId,
          accessToken,
          refreshToken,
          accessExpiresIn,
          refreshExpiresIn
        }
        // window.localStorage.setItem("PivotCareUser", JSON.stringify(pivotCareUser));
        return {
          ...state,
          userInfo: action.payload,
        };
      case userActionTypes.USER_LOGOUT:
        // window.localStorage.removeItem("PivotCareUser");
        return {
          userInfo: {
            userType: "guest",
            authId: null,
            accessToken: null,
            refreshToken: null,
            accessExpiresIn: null,
            refreshExpiresIn: null
          }
        };
      default:
        return state;
    }
}

export default userReducer;