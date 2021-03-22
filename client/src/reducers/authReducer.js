const initialState = {
  token: localStorage.getItem("token") || null,
  loginWindowHandler: false,
  admin: localStorage.getItem("admin") || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOGIN_WINDOW":
      return {
        ...state,
        loginWindowHandler: action.payload.loginWindowHandler,
      };
    case "HIDE_LOGIN_WINDOW":
      return {
        ...state,
        loginWindowHandler: action.payload.loginWindowHandler,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
