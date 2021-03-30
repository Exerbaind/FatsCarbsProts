import axios from "axios";
import ApplicationBtn from "../application-components/application-button/applicationBtn";
import {
  addToBasketAction,
  incrementDishAction,
  deleteDishAction,
} from "../../actions/basketAction";
import { setCurrentDishAction } from "../../actions/editActions";
import { openEditFormAction } from "../../actions/formsActions";
import {
  messageShowAction,
  messageHideAction,
} from "../../actions/dataActions";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
const DishCard = ({ dish }) => {
  const dispatch = useDispatch();
  const favoriteDishes = useSelector((state) => state.favorite.favoriteDishes);
  const basketItems = useSelector((state) => state.basket.basketItems);

  const isLogged = useSelector((state) => state.auth.token);

  const kcal = useSelector((state) => state.basket.totalKcal);
  const prots = useSelector((state) => state.basket.totalProts);
  const fats = useSelector((state) => state.basket.totalFats);
  const carbs = useSelector((state) => state.basket.totalCarbs);

  const [isFavoriteDish, setIsFavoriteFavorite] = useState(dish.isFavorite);
  const [isCompositionActive, setIsCompositionActive] = useState(false);
  let inBasket = basketItems.filter((item) => item._id === dish._id);

  if (inBasket.length) {
    dish.inBasket = true;
  }

  if (isLogged && favoriteDishes.length) {
    let isFavorite = favoriteDishes.filter((item) => item._id === dish._id);
    if (isFavorite.length) {
      dish.isFavorite = true;
    }
  }

  function compositionToggle() {
    setIsCompositionActive(!isCompositionActive);
  }

  function addDish(kcal, prots, fats, carbs, dish) {
    let dishInBasket = basketItems.filter((item) => item._id === dish._id);
    if (!dishInBasket.length) {
      dispatch(addToBasketAction(dish));
      dispatch(incrementDishAction(kcal, prots, fats, carbs, dish));
      dish.inBasket = true;
    }
  }

  function deleteDish(basketList, dish, kcal, prots, fats, carbs) {
    dispatch(deleteDishAction(basketList, dish, kcal, prots, fats, carbs, 1));
    dish.inBasket = false;
  }

  const editDishData = async (dish) => {
    dispatch(openEditFormAction);
    dispatch(setCurrentDishAction(dish));
  };

  const favoriteDishHandler = async () => {
    if (dish.inBasket === false) {
      dish.isFavorite = !dish.isFavorite;
      try {
        await axios.post("/api/favorite/upload", {
          authorization: localStorage.getItem("token"),
          dish: dish,
        });
        if (dish.isFavorite === true) {
          setIsFavoriteFavorite(true);
          dispatch(
            messageShowAction(
              "блюдо добавлено в избранное",
              "message__context--success"
            )
          );
          setTimeout(() => {
            dispatch(messageHideAction());
          }, 2000);
        } else {
          setIsFavoriteFavorite(false);
          dispatch(
            messageShowAction(
              "блюдо удалено из избранного",
              "message__context--failure"
            )
          );
          setTimeout(() => {
            dispatch(messageHideAction());
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(
        messageShowAction(
          "сначала удалите этот товар из корзины",
          "message__context--failure"
        )
      );
      setTimeout(() => {
        dispatch(messageHideAction());
      }, 3000);
    }
  };

  function toLogin() {
    dispatch(
      messageShowAction(
        "вам необходимо войти или зарегистрироваться",
        "message__context--failure"
      )
    );
    setTimeout(() => {
      dispatch(messageHideAction());
    }, 3000);
  }
  return (
    <div className="dish-card">
      {dish.composition && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="0 0 512 512"
          className={`dish-card__composition-svg ${
            isCompositionActive ? "dish-card__composition-svg--active" : ""
          }`}
          onClick={compositionToggle}
        >
          <g>
            <path
              d="M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992     C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008     s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z"
              fill="#161616"
              className="dish-card__composition-icon"
            />
            <path
              d="M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983     C180,136.725,173.284,130.008,165,130.008z"
              fill="#161616"
              className="dish-card__composition-icon"
            />
            <path
              d="M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61     c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61     C172.81,71.61,168.95,70.011,165,70.011z"
              fill="#161616"
              className="dish-card__composition-icon"
            />
          </g>
        </svg>
      )}
      {dish.composition && (
        <div
          className={`dish-card__composition ${
            isCompositionActive ? "dish-card__composition--active" : ""
          }`}
        >
          <p className="dish-card__parameter">
            <span>Состав:</span> {dish.composition}
          </p>
        </div>
      )}

      <p className="dish-card__name">{dish.name}</p>
      <p className="dish-card__restaurant">{dish.restaurant}</p>
      {dish.category && (
        <p className="dish-card__parameter">
          <span>Категория:</span> {dish.category}
        </p>
      )}
      {dish.price && (
        <p className="dish-card__parameter">
          <span>Цена:</span> {dish.price} рублей
        </p>
      )}
      <p className="dish-card__parameter">
        <span>Вес:</span> {dish.weight} грамм
      </p>
      <p className="dish-card__parameter">
        <span>Расчет БЖУ:</span> {dish.size}
      </p>
      <div className="dish-card__nutritional">
        <div className="nutritional__item">
          <p className="nutritional__name">калории</p>
          <p className="nutritional__value">{dish.kcals.toFixed(2)}</p>
        </div>
        <div className="nutritional__item">
          <p className="nutritional__name">белки</p>
          <p className="nutritional__value">{dish.prots.toFixed(2)}</p>
        </div>
        <div className="nutritional__item">
          <p className="nutritional__name">жиры</p>
          <p className="nutritional__value">{dish.fats.toFixed(2)}</p>
        </div>
        <div className="nutritional__item">
          <p className="nutritional__name">углеводы</p>
          <p className="nutritional__value">{dish.carbs.toFixed(2)}</p>
        </div>
      </div>
      <div className="dish-card__actions">
        {dish.inBasket ? (
          <button
            className="dish-card__delete-dish"
            onClick={() =>
              deleteDish(basketItems, dish, kcal, prots, fats, carbs)
            }
          >
            Удалить
          </button>
        ) : (
          <ApplicationBtn
            name="Добавить"
            action={() => addDish(kcal, prots, fats, carbs, dish)}
          />
        )}
        <div
          className="dish-card__to-favourite"
          onClick={isLogged ? () => favoriteDishHandler() : toLogin}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={`dish-card__favorite-icon ${
              isFavoriteDish ? "dish-card__favorite-icon--active" : ""
            }`}
          >
            <g>
              <path
                d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
			c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
			c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
			s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
			C512,93.417,453.532,30,376,30z"
              />
            </g>
          </svg>
        </div>
      </div>
      <button className="dish-card__error" onClick={() => editDishData(dish)}>
        Не верные данные ?
      </button>
    </div>
  );
};

export default DishCard;
