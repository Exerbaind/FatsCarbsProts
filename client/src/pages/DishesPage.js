import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchField from "../components/search/searchField";
import DishCard from "../components/dish-card/dishCard";
import {
  loadFavoriteDishesAction,
  loadDishesAction,
} from "../actions/dataActions";
import Preloader from "../components/preloader/preloader";
const DishesPage = () => {
  const dispatch = useDispatch();

  const [hasSearched, setHasSearched] = useState(false);
  const [searchedDishes, setSearchedDishes] = useState([]);
  const dishesData = useSelector((state) => state.api.dishesData);
  const [inputDish, setInputDish] = useState("");
  // const favoriteDishes = useSelector((state) => state.api.favoriteDishes);
  const isLogged = useSelector((state) => state.auth.token);
  // const basketItems = useSelector((state) => state.basket.basketItems);
  const isLoading = useSelector((state) => state.api.isLoading);

  useEffect(() => {
    dispatch(loadDishesAction());
    isLogged && dispatch(loadFavoriteDishesAction());
  }, [dispatch]);

  function searchAction(e) {
    e.preventDefault();
    let filtredArray = [];
    dishesData.map((dish) => {
      if (
        dish.name.toLocaleLowerCase().includes(inputDish.toLocaleLowerCase())
      ) {
        filtredArray.push(dish);
      }
    });
    // for (let i = 0; i < dishesData.length; i++) {
    //   for (let j = 0; j < dishesData[i].menu.length; j++) {
    //     if (
    //       dishesData[i].menu[j].name
    //         .toLocaleLowerCase()
    //         .includes(inputDish.toLocaleLowerCase())
    //     ) {
    //       favoriteDishes.map((dish) => {
    //         if (dish.id === dishesData[i].menu[j].id) {
    //           dishesData[i].menu[j].isFavorite = true;
    //         }
    //       });
    //       basketItems.map((basketDish) => {
    //         if (basketDish.id === dishesData[i].menu[j].id) {
    //           dishesData[i].menu[j].inBasket = true;
    //         }
    //       });
    //       filtredArray.push(dishesData[i].menu[j]);
    //     }
    //   }
    // }
    setSearchedDishes(filtredArray);
    setHasSearched(true);
  }

  return (
    <div className="page">
      <h1 className="page__title">Блюда</h1>
      <SearchField
        setRestaurant={setInputDish}
        searchAction={searchAction}
        placeholder="Какое блюдо вас интересует?"
      />
      <div className="dish__list">
        {!hasSearched && (
          <p className="empty__list">
            Введите название блюда, которое хотите найти, и оно отобразится
            здесь :)
          </p>
        )}
        {hasSearched & !searchedDishes.length ? (
          <p className="empty__list">
            К сожалению, по вашему запросу ничего не найдено, но вы можете
            добавить данное блюдо!
          </p>
        ) : (
          searchedDishes.map((dish) => {
            return <DishCard dish={dish} key={dish._id} />;
          })
        )}
        {/* {isLoading ? (
          <Preloader />
        ) : searchedDishes ? (
          searchedDishes.map((dish) => {
            return <DishCard dish={dish} key={dish._id} />;
          })
        ) : (
          <p className="empty__list">
            Введите название блюда, которое хотите найти, и оно отобразится
            здесь :)
          </p>
        )} */}
      </div>
    </div>
  );
};

export default DishesPage;
