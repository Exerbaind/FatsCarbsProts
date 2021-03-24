import axios from "axios";
export const loadDishesAction = () => async (dispatch) => {
  const dishesAPI = await axios
    .get("/api/edit/load-dishes")
    .then((result) => result.data);
  dishesAPI.map((dish) => {
    if (dish.size === "на 100 грамм") {
      dish.kcals = dish.kcals * (dish.weight / 100);
      dish.prots = dish.prots * (dish.weight / 100);
      dish.fats = dish.fats * (dish.weight / 100);
      dish.carbs = dish.carbs * (dish.weight / 100);
    } else {
      return dish;
    }
  });
  dispatch({
    type: "LOAD_DISHES",
    payload: {
      dishesData: dishesAPI,
      isLoading: false,
    },
  });
};

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
