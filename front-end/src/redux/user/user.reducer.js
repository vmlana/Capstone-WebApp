import { userActionTypes } from './user.actions';

const INITIAL_STATE = {
  userInfo: {
    userType: "guest",
    authId: null,
    token: null,
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case userActionTypes.USER_SIGNIN_SIGNUP:
        return {
          ...state,
          userInfo: action.payload,
        };
      case userActionTypes.USER_LOGOUT:
        return INITIAL_STATE;
      default:
        return state;
    }
}

export default userReducer;