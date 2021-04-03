import axios from "axios";
export const loadDishesAction = (dishName) => async (dispatch) => {
  let loaded = true;
  const dishesAPI = await axios
    .get(`/api/data/load-dishes?params=${dishName}`)
    .then((result) => {
      loaded = false;
      return result.data;
    });
  if (!dishesAPI.length || dishesAPI !== "ничего не найдено") {
    dishesAPI.map((dish) => {
      if (dish.size === "на 100 грамм") {
        dish.kcals = dish.kcals * (dish.weight / 100);
        dish.prots = dish.prots * (dish.weight / 100);
        dish.fats = dish.fats * (dish.weight / 100);
        dish.carbs = dish.carbs * (dish.weight / 100);
      }
    });
    dishesAPI.sort((prev, next) => {
      if (prev.name < next.name) return -1;
      if (prev.name < next.name) return 1;
    });
  }

  dispatch({
    type: "LOAD_DISHES",
    payload: {
      dishesData: dishesAPI,
      isLoading: loaded,
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
