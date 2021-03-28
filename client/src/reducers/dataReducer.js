const initialState = {
  dishesData: [],
  isLoading: false,
  message: {
    text: "",
    class: "",
    show: false,
  },
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_DISHES":
      return {
        ...state,
        dishesData: action.payload.dishesData,
        isLoading: action.payload.isLoading,
      };
    case "MESSAGE_SHOW":
      return {
        ...state,
        message: {
          text: action.payload.messageText,
          class: action.payload.messageClass,
          show: action.payload.messageShow,
        },
      };
    case "MESSAGE_HIDE":
      return {
        ...state,
        message: {
          text: action.payload.messageText,
          class: action.payload.messageClass,
          show: action.payload.messageShow,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default dataReducer;
