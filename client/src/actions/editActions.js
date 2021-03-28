import axios from "axios";
export const setCurrentDishAction = (dish) => async (dispatch) => {
  dispatch({
    type: "SET_CURRENT_DISH",
    payload: {
      currentDish: dish,
    },
  });
};

export const loadEditDishesAction = () => async (dispatch) => {
  const dishesList = await axios.get(`/api/edit/load-dishes`);
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

export const deleteNewDishAction = (dish, list) => async (dispatch) => {
  const newList = list.filter((item) => item._id !== dish._id);
  dispatch({
    type: "DELETE_NEW_DISH",
    payload: {
      newDishesList: newList,
    },
  });
};

export const loadNewDishesAction = () => async (dispatch) => {
  const dishesList = await axios.get(`/api/new/load`);
  dispatch({
    type: "LOAD_NEW_DISHES",
    payload: {
      newDishesList: dishesList.data,
    },
  });
};
