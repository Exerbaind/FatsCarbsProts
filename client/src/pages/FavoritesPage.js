import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadDishesAction } from "../actions/dataActions";
import { loadFavoriteDishesAction } from "../actions/favoriteAction";
import DishCard from "../components/dish-card/dishCard";
import Preloader from "../components/preloader/preloader";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteDishes = useSelector((state) => state.favorite.favoriteDishes);
  const basketItems = useSelector((state) => state.basket.basketItems);
  const isLoading = useSelector((state) => state.favorite.isLoading);
  useEffect(() => {
    dispatch(loadFavoriteDishesAction());
    dispatch(loadDishesAction());
    basketChecker();
  }, [favoriteDishes.length]);

  function basketChecker() {
    basketItems.map((basketDish) => {
      for (let index = 0; index < favoriteDishes.length; index++) {
        if (basketDish._id === favoriteDishes[index]._id) {
          return (favoriteDishes[index].inBasket = true);
        }
      }
    });
    // basketItems.length || favoriteDishes.map((item) => (item.inBasket = false));
  }
  basketChecker();
  return (
    <div>
      <h1 className="page__title">Избранное</h1>
      {favoriteDishes.length ? (
        isLoading ? (
          <Preloader />
        ) : (
          favoriteDishes.map((dish) => {
            return <DishCard dish={dish} key={dish._id} />;
          })
        )
      ) : (
        <p className="empty__list">Вы еще ничего не добавили в избранное</p>
      )}
      {/* {isLoading ? (
        <Preloader />
      ) : (
        <div className="page__list">
          {favoriteDishes.length ? (
            favoriteDishes.map((dish) => {
              return <DishCard dish={dish} key={dish._id} />;
            })
          ) : (
            <p className="empty__list">тут пока ничего нет</p>
          )}
        </div>
      )} */}
    </div>
  );
};

export default FavoritesPage;
