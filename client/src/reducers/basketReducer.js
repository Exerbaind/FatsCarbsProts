const initialState = {
  isOpened: false,
  basketItems: localStorage.getItem("basket") || [],
  totalKcal: 0,
  totalProts: 0,
  totalFats: 0,
  totalCarbs: 0,
};

const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_BASKET":
      return {
        ...state,
        isOpened: action.payload.isOpened,
      };
    case "CLOSE_BASKET":
      return {
        ...state,
        isOpened: action.payload.isOpened,
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basketItems: [...state.basketItems, action.payload.basketItems],
      };
    case "INCREMENT_DISH":
      return {
        ...state,
        totalKcal: action.payload.totalKcal,
        totalProts: action.payload.totalProts,
        totalFats: action.payload.totalFats,
        totalCarbs: action.payload.totalCarbs,
      };
    case "DECREMENT_DISH":
      return {
        ...state,
        totalKcal: action.payload.totalKcal,
        totalProts: action.payload.totalProts,
        totalFats: action.payload.totalFats,
        totalCarbs: action.payload.totalCarbs,
      };
    case "CLEAR_BASKET":
      return {
        ...state,
        basketItems: action.payload.basketItems,
        totalKcal: action.payload.totalKcal,
        totalProts: action.payload.totalProts,
        totalFats: action.payload.totalFats,
        totalCarbs: action.payload.totalCarbs,
      };
    case "DELETE_DISH":
      return {
        ...state,
        basketItems: action.payload.basketItems,
        totalKcal: action.payload.totalKcal,
        totalProts: action.payload.totalProts,
        totalFats: action.payload.totalFats,
        totalCarbs: action.payload.totalCarbs,
      };
    default:
      return {
        ...state,
      };
  }
};

export default basketReducer;
