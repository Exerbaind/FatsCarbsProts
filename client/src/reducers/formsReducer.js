const initialState = {
  formsMenu: false,
  editForm: false,
  newDishForm: false,
  photosForm: false,
};

const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_FORMS_MENU": {
      return {
        ...state,
        formsMenu: action.payload.formsMenu,
      };
    }
    case "CLOSE_FORMS_MENU": {
      return {
        ...state,
        formsMenu: action.payload.formsMenu,
      };
    }
    case "OPEN_EDIT_FORM": {
      return {
        ...state,
        editForm: action.payload.editForm,
      };
    }
    case "CLOSE_EDIT_FORM": {
      return {
        ...state,
        editForm: action.payload.editForm,
      };
    }
    case "OPEN_NEW_DISH_FORM": {
      return {
        ...state,
        newDishForm: action.payload.newDishForm,
        formsMenu: action.payload.formsMenu,
      };
    }
    case "CLOSE_NEW_DISH_FORM": {
      return {
        ...state,
        newDishForm: action.payload.newDishForm,
      };
    }
    case "OPEN_PHOTOS_FORM": {
      return {
        ...state,
        photosForm: action.payload.photosForm,
        formsMenu: action.payload.formsMenu,
      };
    }
    case "CLOSE_PHOTOS_FORM": {
      return {
        ...state,
        photosForm: action.payload.photosForm,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default formsReducer;
