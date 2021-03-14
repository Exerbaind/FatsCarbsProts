import { useParams } from "react-router-dom";
import foodData from "../../api/restaurants";
import DishCard from "../../components/dish-card/dishCard";
const RestaurantItemPage = () => {
  const restaurantID = useParams().id;
  const data = foodData();
  const restaurant = data.filter((item) => +item.id === +restaurantID);

  return (
    <div className="restaurant-page">
      <h1 className="restaurant-page__title">{restaurant[0].name}</h1>
      <h2 className="restaurant-page__list-title">Меню</h2>
      <div className="restaurant-page__menu-list">
        {restaurant[0].menu.map((dish) => {
          return <DishCard dish={dish} key={dish.id} />;
        })}
      </div>
    </div>
  );
};

export default RestaurantItemPage;
