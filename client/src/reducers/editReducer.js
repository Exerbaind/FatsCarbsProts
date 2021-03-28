const initialState = {
  currentDish: {},
  editDishesList: [],
  newDishesList: [],
};

const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_DISH":
      return {
        ...state,
        currentDish: action.payload.currentDish,
      };
    case "OPEN_NEW_DISH_FORM":
      return {
        ...state,
        newDishForm: action.payload.newDishForm,
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
    case "DELETE_NEW_DISH":
      return {
        ...state,
        newDishesList: action.payload.newDishesList,
      };
    case "LOAD_NEW_DISHES":
      return {
        ...state,
        newDishesList: action.payload.newDishesList,
      };
    default:
      return {
        ...state,
      };
  }
};

export default editReducer;
