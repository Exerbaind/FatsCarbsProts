import { useSelector, useDispatch } from "react-redux";
import { deleteEditDishAction } from "../../../actions/editActions";
import axios from "axios";
const EditPageItem = ({ dish }) => {
  const dispatch = useDispatch();
  const dishesData = useSelector((state) => state.api.dishesData);

  const restaurant = dishesData.filter((item) => +item.id === +dish.restaurant);
  const editDishes = useSelector((state) => state.edit.editDishesList);

  console.log(editDishes);

  async function deleteDish(dish, list) {
    await axios.post("/api/edit/edit-dish/delete", {
      dish: dish,
    });
    dispatch(deleteEditDishAction(dish, list));
  }

  return (
    <div className="dish-card">
      <p className="dish-card__name">{dish.name}</p>
      <p className="dish-card__restaurant">
        {restaurant && restaurant[0].name}
      </p>
      <p className="dish-card__parameter">
        <span>Вес:</span> {dish.weight} грамм
      </p>
      <p className="dish-card__parameter">
        <span>Расчет БЖУ:</span> {dish.nutritional_value.size}
      </p>
      <div className="dish-card__nutritional">
        <div className="nutritional__item">
          <p className="nutritional__name">калории</p>
          <p className="nutritional__value">{dish.nutritional_value.kcal}</p>
        </div>
        <div className="nutritional__item">
          <p className="nutritional__name">белки</p>
          <p className="nutritional__value">{dish.nutritional_value.prots}</p>
        </div>
        <div className="nutritional__item">
          <p className="nutritional__name">жиры</p>
          <p className="nutritional__value">{dish.nutritional_value.fats}</p>
        </div>
        <div className="nutritional__item">
          <p className="nutritional__name">углеводы</p>
          <p className="nutritional__value">{dish.nutritional_value.carbs}</p>
        </div>
      </div>
      <div className="dish-card__actions edit">
        <button className="dish-card__edit-refresh">Обновить блюдо</button>
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
