import axios from "axios";

export const loadFavoriteDishesAction = () => async (dispatch) => {
  const dataList = await axios.get(
    `/api/favorite/load?params=${localStorage.getItem("token")}`
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
  let filteredDishes = favoriteDishes.filter((item) => item.i_d !== dish._id);
  dispatch({
    type: "REMOVE_FAVORITE_DISH",
    payload: {
      favoriteDishes: filteredDishes,
    },
  });
};
