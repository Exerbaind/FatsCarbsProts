import foodData from "../api/restaurants";
import axios from "axios";
export const loadDishesAction = () => async (dispatch) => {
  const data = foodData();
  dispatch({
    type: "LOAD_DISHES",
    payload: {
      dishesData: data,
      isLoading: false,
    },
  });
};

export const loadFavoriteDishesAction = () => async (dispatch) => {
  const dataList = await axios.get(
    `/api/dishes/favorite?params=${localStorage.getItem("token")}`
  );
  dispatch({
    type: "LOAD_FAVORITE_DISHES",
    payload: {
      favoriteDishes: dataList.data,
      isLoading: false,
    },
  });
};

export const addFavoriteDishAction = (dish) => async (dispatch) => {
  dispatch({
    type: "ADD_FAVORITE_DISH",
    payload: {
      favoriteDishes: dish,
    },
  });
};

export const removeFavoriteDishAction = (dish, favoriteDishes) => async (
  dispatch
) => {
  let filteredDishes = favoriteDishes.filter((item) => item.id !== dish.id);
  dispatch({
    type: "REMOVE_FAVORITE_DISH",
    payload: {
      favoriteDishes: filteredDishes,
    },
  });
};

export const messageShowAction = (text, style) => async (dispatch) => {
  dispatch({
    type: "MESSAGE_SHOW",
    payload: {
      messageText: text,
      messageClass: style,
      messageShow: true,
    },
  });
};

export const messageHideAction = () => async (dispatch) => {
  dispatch({
    type: "MESSAGE_HIDE",
    payload: {
      messageText: "",
      messageClass: "",
      messageShow: false,
    },
  });
};
