import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPageItem from "./edit-page-item/AddPageItem";
import { loadNewDishesAction } from "../../actions/editActions";
import axios from "axios";
import DishPhotoCard from "../../components/dish-photo-card/DishPhotoCard";

const NewFoodPage = () => {
  const dispatch = useDispatch();
  const newDishes = useSelector((state) => state.edit.newDishesList);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    dispatch(loadNewDishesAction());
    axios.get("/api/photo/download").then((result) => setPhotos(result.data));
  }, [newDishes.length]);

  return (
    <div className="edit-page">
      <h1 className="page__title">Новые блюда</h1>
      <div className="page__list">
        {newDishes &&
          newDishes.map((dish, index) => {
            return <AddPageItem dish={dish} key={index} />;
          })}
      </div>
      <h2 className="page__title">Новые фотографии</h2>
      <div className="page__list">
        {photos &&
          photos.map((item, index) => {
            return <DishPhotoCard photo={item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default NewFoodPage;
