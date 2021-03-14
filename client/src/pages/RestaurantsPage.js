import { useState } from "react";
import foodData from "../api/restaurants";
import SearchField from "../components/search/searchField";
import RestaurantCard from "../components/restaurant-card/restaurantCard";
const RestaurantsPage = () => {
  const [searchedRestourants, setSearchedRestourants] = useState(null);
  const food = foodData();
  const [restaurant, setRestaurant] = useState("");

  function searchAction(e) {
    e.preventDefault();
    let filtredArray = [];
    for (let i = 0; i < food.length; i++) {
      for (let j = 0; j < food[i].search_names.length; j++) {
        if (food[i].search_names[j].includes(restaurant.toLocaleLowerCase())) {
          filtredArray.push(food[i]);
        }
      }
    }
    setSearchedRestourants(filtredArray);
  }

  return (
    <div className="page">
      <h1 className="page__title">Рестораны</h1>
      <SearchField
        setRestaurant={setRestaurant}
        searchAction={searchAction}
        placeholder="Какой ресторан интересует?"
      />
      <div className="place__list">
        {searchedRestourants ? (
          searchedRestourants.map((place) => {
            return <RestaurantCard place={place} key={place.id} />;
          })
        ) : (
          <p className="empty__list">
            Введите ресторан, который хотите найти, и он отобразится здесь :)
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantsPage;
