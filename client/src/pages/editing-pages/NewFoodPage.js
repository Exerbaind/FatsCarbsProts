import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPageItem from "./edit-page-item/AddPageItem";
// import { loadDishesAction } from "../../actions/dataActions";
import { loadNewDishesAction } from "../../actions/editActions";
import axios from "axios";

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

  // function pathCorrect(path) {
  //   console.log(path);
  //   path = path.split("/");
  //   path.splice(0, 2);
  //   path = path.join("/");
  //   console.log(path);
  //   return path;
  // }
  return (
    <div className="edit-page">
      <h1 className="page__title">Новые блюда</h1>
      <div className="page__list">
        {newDishes &&
          newDishes.map((dish, index) => {
            return <AddPageItem dish={dish} key={index} />;
          })}
      </div>
      {/* <div className="page__list">
        {photos &&
          photos.map((item) => {
            return (
              <img
                src={`client/public/images/${item.filename}`}
                alt=""
                className="dish__photo"
              />
            );
          })}
      </div> */}
    </div>
  );
};

export default NewFoodPage;
