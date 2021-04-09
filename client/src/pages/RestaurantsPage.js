import { useState } from "react";
import SearchField from "../components/search/searchField";
import RestaurantCard from "../components/restaurant-card/restaurantCard";
const RestaurantsPage = () => {
  const [searchedRestourants, setSearchedRestourants] = useState(null);

  function searchAction(e) {
    e.preventDefault();
    let filtredArray = [];
    setSearchedRestourants(filtredArray);
  }

  return (
    <div className="page">
      <h1 className="page__title">Рестораны</h1>
      <SearchField
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
