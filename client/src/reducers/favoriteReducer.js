const initialState = {
  favoriteDishes: [],
  isLoading: true,
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return {
        ...state,
      };
  }
};

export default favoriteReducer;
