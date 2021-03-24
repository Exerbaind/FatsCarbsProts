import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteDishAction,
  incrementDishAction,
  decrementDishAction,
} from "../../../actions/basketAction";

const BasketDishes = ({ dish }) => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state) => state.basket.basketItems);

  const kcal = useSelector((state) => state.basket.totalKcal);
  const prots = useSelector((state) => state.basket.totalProts);
  const fats = useSelector((state) => state.basket.totalFats);
  const carbs = useSelector((state) => state.basket.totalCarbs);

  const [dishCount, setDishCount] = useState(1);

  function deleteDish(basketList, dish, kcal, prots, fats, carbs) {
    dispatch(
      deleteDishAction(basketList, dish, kcal, prots, fats, carbs, dishCount)
    );
    dish.inBasket = false;
  }

  function dishIncremet() {
    setDishCount(dishCount + 1);
    dispatch(incrementDishAction(kcal, prots, fats, carbs, dish));
  }
  function dishDecremet(basketList) {
    setDishCount(dishCount - 1);
    if (dishCount === 1) {
      deleteDish(basketList, dish, kcal, prots, fats, carbs);
      dish.inBasket = false;
    } else {
      dispatch(decrementDishAction(kcal, prots, fats, carbs, dish));
    }
  }
  return (
    <div className="basket-dish">
      <p className="basket-dish__name">{dish.name}</p>
      <div className="basket-dish__nutritional-values">
        <div className="basket-dish__nutritional">
          <p className="nutritional__name">калории</p>
          <p className="nutritional__value">
            {(dish.kcals * dishCount).toFixed(2)}
          </p>
        </div>
        <div className="basket-dish__nutritional">
          <p className="nutritional__name">белки</p>
          <p className="nutritional__value">
            {(dish.prots * dishCount).toFixed(2)}
          </p>
        </div>
        <div className="basket-dish__nutritional">
          <p className="nutritional__name">жиры</p>
          <p className="nutritional__value">
            {(dish.fats * dishCount).toFixed(2)}
          </p>
        </div>
        <div className="basket-dish__nutritional">
          <p className="nutritional__name">углеводы</p>
          <p className="nutritional__value">
            {(dish.carbs * dishCount).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="basket-dish__editing">
        <button
          className="editing-delete"
          onClick={() =>
            deleteDish(basketItems, dish, kcal, prots, fats, carbs)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="512"
            height="512"
            x="0"
            y="0"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
            className="editing-delete__icon"
          >
            <g>
              <g xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z"
                  fill="#ffffff"
                  className="editing-delete__icon-cap"
                />
                <path
                  d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z"
                  fill="#ffffff"
                  className="editing-delete__icon-body"
                />
              </g>
            </g>
          </svg>
        </button>
        <div className="editing-controll">
          <button
            className="editing-controll__handler"
            onClick={() => dishDecremet(basketItems)}
          >
            -
          </button>
          <p className="editing-controll__total-number">{dishCount}</p>

          <button className="editing-controll__handler" onClick={dishIncremet}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketDishes;
