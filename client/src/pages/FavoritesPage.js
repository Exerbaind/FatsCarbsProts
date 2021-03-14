import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadFavoriteDishesAction,
  loadDishesAction,
} from "../actions/dataActions";
import DishCard from "../components/dish-card/dishCard";
import Preloader from "../components/preloader/preloader";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteDishes = useSelector((state) => state.api.favoriteDishes);
  const basketItems = useSelector((state) => state.basket.basketItems);
  const isLoading = useSelector((state) => state.api.isLoading);
  useEffect(() => {
    dispatch(loadFavoriteDishesAction());
    dispatch(loadDishesAction());
    basketChecker();
  }, [favoriteDishes.length]);

  function basketChecker() {
    basketItems.map((basketDish) => {
      for (let index = 0; index < favoriteDishes.length; index++) {
        if (basketDish.id === favoriteDishes[index].id) {
          favoriteDishes[index].inBasket = true;
        }
      }
    });
    // basketItems.length || favoriteDishes.map((item) => (item.inBasket = false));
  }
  basketChecker();
  return (
    <div>
      <h1 className="page__title">Избранное</h1>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="dish__list">
          {favoriteDishes.length ? (
            favoriteDishes.map((dish) => {
              return <DishCard dish={dish} key={dish.id} />;
            })
          ) : (
            <p className="empty__list">тут пока ничего нет</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
