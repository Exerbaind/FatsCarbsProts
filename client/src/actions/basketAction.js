export const openBasketAction = {
  type: "OPEN_BASKET",
  payload: {
    isOpened: true,
  },
};

export const closeBasketAction = {
  type: "CLOSE_BASKET",
  payload: {
    isOpened: false,
  },
};

export const addToBasketAction = (dish) => async (dispatch) => {
  dispatch({
    type: "ADD_TO_BASKET",
    payload: {
      basketItems: dish,
    },
  });
};

export const incrementDishAction = (kcal, prots, fats, carbs, dish) => async (
  dispatch
) => {
  dispatch({
    type: "INCREMENT_DISH",
    payload: {
      totalKcal: kcal + dish.nutritional_value.kcal,
      totalProts: prots + dish.nutritional_value.prots,
      totalFats: fats + dish.nutritional_value.fats,
      totalCarbs: carbs + dish.nutritional_value.carbs,
    },
  });
};

export const decrementDishAction = (kcal, prots, fats, carbs, dish) => async (
  dispatch
) => {
  dispatch({
    type: "DECREMENT_DISH",
    payload: {
      totalKcal: kcal - dish.nutritional_value.kcal,
      totalProts: prots - dish.nutritional_value.prots,
      totalFats: fats - dish.nutritional_value.fats,
      totalCarbs: carbs - dish.nutritional_value.carbs,
    },
  });
};

export const clearBasketAction = {
  type: "CLEAR_BASKET",
  payload: {
    basketItems: [],
    totalKcal: 0,
    totalProts: 0,
    totalFats: 0,
    totalCarbs: 0,
  },
};
export const deleteDishAction = (
  itemsList,
  dish,
  kcal,
  prots,
  fats,
  carbs,
  dishCount
) => async (dispatch) => {
  const filteredBasket = itemsList.filter((item) => item.id !== dish.id);
  dispatch({
    type: "DELETE_DISH",
    payload: {
      basketItems: filteredBasket,
      totalKcal: Math.abs(kcal - dish.nutritional_value.kcal * dishCount),
      totalProts: Math.abs(prots - dish.nutritional_value.prots * dishCount),
      totalFats: Math.abs(fats - dish.nutritional_value.fats * dishCount),
      totalCarbs: Math.abs(carbs - dish.nutritional_value.carbs * dishCount),
    },
  });
};
