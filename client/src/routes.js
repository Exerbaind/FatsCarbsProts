import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// Страницы
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import DishesPage from "./pages/DishesPage";
import RestaurantItemPage from "./pages/restaurant-page/RestaurantItemPage";
import FoodEditPage from "./pages/editing-pages/FoodEditPage";
import NewFoodPage from "./pages/editing-pages/NewFoodPage";
import AboutPage from "./pages/about-page/AboutPage";

export const useRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.admin);
  if (isAdmin) {
    return (
      <Switch>
        {/* <Route path="/profile" exact>
          <ProfilePage />
        </Route> */}
        <Route path="/favourites" exact>
          <FavoritesPage />
        </Route>
        <Route path="/" exact>
          {/* <HomePage /> */}
          <DishesPage />
        </Route>
        <Route path="/restaurants" exact>
          <RestaurantsPage />
        </Route>
        {/* <Route path="/dishes" exact>
          <DishesPage />
        </Route> */}
        <Route path="/requests/food-edit" exact>
          <FoodEditPage />
        </Route>
        <Route path="/restaurant/:id" exact>
          <RestaurantItemPage />
        </Route>
        <Route path="/resolve/food-edit" exact>
          <FoodEditPage />
        </Route>
        <Route path="/resolve/new-food" exact>
          <NewFoodPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  if (isAuthenticated) {
    return (
      <Switch>
        {/* <Route path="/profile" exact>
          <ProfilePage />
        </Route> */}
        <Route path="/favourites" exact>
          <FavoritesPage />
        </Route>
        <Route path="/about" exact>
          <AboutPage />
        </Route>
        <Route path="/" exact>
          {/* <HomePage /> */}
          <DishesPage />
        </Route>
        <Route path="/restaurants" exact>
          <RestaurantsPage />
        </Route>
        {/* <Route path="/dishes" exact>
          <DishesPage />
        </Route> */}
        <Route path="/restaurant/:id" exact>
          <RestaurantItemPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        {/* <HomePage /> */}
        <DishesPage />
      </Route>
      <Route path="/restaurants" exact>
        <RestaurantsPage />
      </Route>
      {/* <Route path="/dishes" exact>
        <DishesPage />
      </Route> */}
      <Route path="/restaurant/:id" exact>
        <RestaurantItemPage />
      </Route>
      <Route path="/about" exact>
        <AboutPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
