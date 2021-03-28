import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchField from "../components/search/searchField";
import DishCard from "../components/dish-card/dishCard";
import { loadDishesAction } from "../actions/dataActions";
import { loadFavoriteDishesAction } from "../actions/favoriteAction";
import Preloader from "../components/preloader/preloader";
const DishesPage = () => {
  const dispatch = useDispatch();

  const dishesData = useSelector((state) => state.api.dishesData);

  const [inputDish, setInputDish] = useState("");
  // const favoriteDishes = useSelector((state) => state.api.favoriteDishes);
  const isLogged = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.api.isLoading);

  useEffect(() => {
    isLogged && dispatch(loadFavoriteDishesAction());
  }, []);

  function searchAction(e) {
    e.preventDefault();
    dispatch(loadDishesAction(inputDish));
  }

  return (
    <div className="page">
      <h1 className="page__title">Блюда</h1>
      <SearchField
        setRestaurant={setInputDish}
        searchAction={searchAction}
        placeholder="Какое блюдо вас интересует?"
      />
      <div className="page__list">
        {dishesData === "ничего не найдено" ? (
          <p className="empty__list">
            К сожалению, по вашему запросу ничего не найдено, но вы можете
            добавить данное блюдо!
          </p>
        ) : isLoading ? (
          <Preloader />
        ) : (
          dishesData.map((dish) => {
            return <DishCard dish={dish} key={dish._id} />;
          })
        )}
      </div>
    </div>
  );
};

export default DishesPage;
