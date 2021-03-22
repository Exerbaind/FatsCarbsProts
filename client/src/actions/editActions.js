import axios from "axios";
export const setCurrentDishAction = (dish) => async (dispatch) => {
  dispatch({
    type: "SET_CURRENT_DISH",
    payload: {
      currentDish: dish,
    },
  });
};

export const openFormAction = {
  type: "OPEN_FORM",
  payload: {
    isShown: true,
  },
};

export const closeFormAction = {
  type: "CLOSE_FORM",
  payload: {
    isShown: false,
  },
};

export const loadEditDishesAction = () => async (dispatch) => {
  const dishesList = await axios.get(`/api/edit/edit-dishes`);
  dispatch({
    type: "LOAD_EDIT_DISHES",
    payload: {
      editDishesList: dishesList.data,
    },
  });
};

export const deleteEditDishAction = (dish, list) => async (dispatch) => {
  const newList = list.filter((item) => item.time !== dish.time);
  dispatch({
    type: "DELETE_EDIT_DISH",
    payload: {
      editDishesList: newList,
    },
  });
};
