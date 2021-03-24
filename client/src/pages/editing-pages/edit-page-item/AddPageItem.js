import { useSelector, useDispatch } from "react-redux";
import { deleteNewDishAction } from "../../../actions/editActions";
import axios from "axios";
const AddPageItem = ({ dish }) => {
  const dispatch = useDispatch();
  const newDishes = useSelector((state) => state.edit.newDishesList);

  async function deleteDish(dish, list) {
    await axios.post("/api/new/delete", {
      dish: dish,
    });
    dispatch(deleteNewDishAction(dish, list));
  }

  return (
    <div className="dish-card">
      <p className="dish-card__name">{dish.name}</p>
      <p className="dish-card__restaurant">{dish.restaurant}</p>
      <p className="dish-card__parameter">
        <span>Вес:</span> {dish.weight} грамм
      </p>
      {dish.price && (
        <p className="dish-card__parameter">
          <span>Цена:</span> {dish.price}
        </p>
      )}
      <p className="dish-card__parameter">
        <span>Расчет БЖУ:</span> {dish.size}
      </p>
      <div className="dish-card__nutritional">
        <div className="nutritional__item">
          <p className="nutritional__name">калории</p>
          <p className="nutritional__value">{dish.kcals.toFixed(2)}</p>
        </div>
        <div className="nutritional__item">
          <p className="nutritional__name">белки</p>
          <p className="nutritional__value">{dish.prots.toFixed(2)}</p>
        </div>
        <div className="nutritional__item">
          <p className="nutritional__name">жиры</p>
          <p className="nutritional__value">{dish.fats.toFixed(2)}</p>
        </div>
        <div className="nutritional__item">
          <p className="nutritional__name">углеводы</p>
          <p className="nutritional__value">{dish.carbs.toFixed(2)}</p>
        </div>
      </div>
      <div className="dish-card__actions edit">
        <button className="dish-card__edit-refresh">Добавить блюдо</button>
        <button
          className="dish-card__edit-delete"
          onClick={() => deleteDish(dish, newDishes)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default AddPageItem;
