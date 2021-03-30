import { useSelector, useDispatch } from "react-redux";
import { deleteEditDishAction } from "../../../actions/editActions";
import axios from "axios";
const EditPageItem = ({ dish }) => {
  const dispatch = useDispatch();
  const editDishes = useSelector((state) => state.edit.editDishesList);

  async function deleteDish(dish, list) {
    await axios.post("/api/edit/delete-dish", {
      dish: dish,
    });
    dispatch(deleteEditDishAction(dish, list));
  }

  async function updateDish(dish, list) {
    await axios.post("/api/edit/update-dish", {
      dish: dish,
    });
    deleteDish(dish, list);
  }

  return (
    <div className="dish-card">
      <p className="dish-card__name">{dish.name}</p>
      <p className="dish-card__restaurant">{dish.restaurant}</p>
      <p className="dish-card__parameter">
        <span>Вес:</span> {dish.weight} грамм
      </p>
      <p className="dish-card__parameter">
        <span>Расчет БЖУ:</span> {dish.size}
      </p>
      {dish.price && (
        <p className="dish-card__parameter">
          <span>Цена:</span> {dish.price}
        </p>
      )}
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
      {dish.composition && (
        <p className="dish-card__parameter">
          <span>Состав:</span> {dish.composition}
        </p>
      )}
      <div className="dish-card__actions edit">
        <button
          className="dish-card__edit-refresh"
          onClick={() => updateDish(dish, editDishes)}
        >
          Обновить блюдо
        </button>
        <button
          className="dish-card__edit-delete"
          onClick={() => deleteDish(dish, editDishes)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default EditPageItem;
