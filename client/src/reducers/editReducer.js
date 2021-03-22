const initialState = {
  currentDish: {},
  isShown: false,
  editDishesList: [],
};

const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_DISH":
      return {
        ...state,
        currentDish: action.payload.currentDish,
      };
    case "OPEN_FORM":
      return {
        ...state,
        isShown: action.payload.isShown,
      };
    case "CLOSE_FORM":
      return {
        ...state,
        isShown: action.payload.isShown,
      };
    case "LOAD_EDIT_DISHES":
      return {
        ...state,
        editDishesList: action.payload.editDishesList,
      };
    case "DELETE_EDIT_DISH":
      return {
        ...state,
        editDishesList: action.payload.editDishesList,
      };
    default:
      return {
        ...state,
      };
  }
};

export default editReducer;
