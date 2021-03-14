const initialState = {
  dishesData: [],
  favoriteDishes: [],
  isLoading: true,
  message: {
    text: "",
    class: "",
    show: false,
  },
};

const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_DISHES":
      return {
        ...state,
        dishesData: action.payload.dishesData,
        isLoading: action.payload.isLoading,
      };
    case "LOAD_FAVORITE_DISHES":
      return {
        ...state,
        favoriteDishes: action.payload.favoriteDishes,
        isLoading: action.payload.isLoading,
      };
    case "ADD_FAVORITE_DISH":
      return {
        ...state,
        favoriteDishes: action.payload.favoriteDishes,
      };
    case "REMOVE_FAVORITE_DISH":
      return {
        ...state,
        favoriteDishes: action.payload.favoriteDishes,
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

export default basketReducer;
