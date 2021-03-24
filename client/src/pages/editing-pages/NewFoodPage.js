import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPageItem from "./edit-page-item/AddPageItem";
import { loadDishesAction } from "../../actions/dataActions";
import { loadNewDishesAction } from "../../actions/editActions";

const NewFoodPage = () => {
  const dispatch = useDispatch();
  const newDishes = useSelector((state) => state.edit.newDishesList);
  useEffect(() => {
    dispatch(loadNewDishesAction());
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
    </div>
  );
};

export default NewFoodPage;
