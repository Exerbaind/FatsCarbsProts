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
      totalKcal: kcal + dish.kcals,
      totalProts: prots + dish.prots,
      totalFats: fats + dish.fats,
      totalCarbs: carbs + dish.carbs,
    },
  });
};

export const decrementDishAction = (kcal, prots, fats, carbs, dish) => async (
  dispatch
) => {
  dispatch({
    type: "DECREMENT_DISH",
    payload: {
      totalKcal: kcal - dish.kcals,
      totalProts: prots - dish.prots,
      totalFats: fats - dish.fats,
      totalCarbs: carbs - dish.carbs,
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
  const filteredBasket = itemsList.filter((item) => item._id !== dish._id);
  dispatch({
    type: "DELETE_DISH",
    payload: {
      basketItems: filteredBasket,
      totalKcal: Math.abs(kcal - dish.kcals * dishCount),
      totalProts: Math.abs(prots - dish.prots * dishCount),
      totalFats: Math.abs(fats - dish.fats * dishCount),
      totalCarbs: Math.abs(carbs - dish.carbs * dishCount),
    },
  });
};
