import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPageItem from "./edit-page-item/AddPageItem";
import { loadDishesAction } from "../../actions/dataActions";
import { loadNewDishesAction } from "../../actions/editActions";
import axios from "axios";

// import image from "../../assets/newDish-photo/1616667246398bg.jpg";

const NewFoodPage = () => {
  const dispatch = useDispatch();
  const newDishes = useSelector((state) => state.edit.newDishesList);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    dispatch(loadNewDishesAction());
    axios
      .get("/api/new/dish-photo-load")
      .then((result) => setPhotos(result.data));
    // dispatch(loadDishesAction());
  }, [newDishes.length]);

  return (
    <div className="edit-page">
      <h1 className="page__title">Новые блюда</h1>
      <div className="dish__list">
        {newDishes &&
          newDishes.map((dish, index) => {
            return <AddPageItem dish={dish} key={index} />;
          })}
      </div>
      <div>
        {photos &&
          photos.map((item) => {
            return <img src={`${item.path}`} alt="" height="100" width="200" />;
          })}
      </div>
    </div>
  );
};

export default NewFoodPage;
