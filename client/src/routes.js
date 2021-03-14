import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// Страницы
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import DishesPage from "./pages/DishesPage";
import RestaurantItemPage from "./pages/restaurant-page/RestaurantItemPage";

export const useRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/favourites" exact>
          <FavoritesPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/restaurants" exact>
          <RestaurantsPage />
        </Route>
        <Route path="/dishes" exact>
          <DishesPage />
        </Route>
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
        <HomePage />
      </Route>
      <Route path="/restaurants" exact>
        <RestaurantsPage />
      </Route>
      <Route path="/dishes" exact>
        <DishesPage />
      </Route>
      <Route path="/restaurant/:id" exact>
        <RestaurantItemPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
