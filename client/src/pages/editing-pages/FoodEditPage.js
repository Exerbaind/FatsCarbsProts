import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditPageItem from "./edit-page-item/EditPageItem";
import { loadDishesAction } from "../../actions/dataActions";

import { loadEditDishesAction } from "../../actions/editActions";
const FoodEditPage = () => {
  const dispatch = useDispatch();
  const editDishes = useSelector((state) => state.edit.editDishesList);
  useEffect(() => {
    dispatch(loadEditDishesAction());
    dispatch(loadDishesAction());
  }, [editDishes.length]);
  return (
    <div className="edit-page">
      <h1 className="page__title">Изменение в блюдах</h1>
      <div className="dish__list">
        {editDishes &&
          editDishes.map((dish) => {
            return <EditPageItem dish={dish} key={dish.time} />;
          })}
      </div>
    </div>
  );
};

export default FoodEditPage;
