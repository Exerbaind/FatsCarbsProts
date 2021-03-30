import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeNewDishFormAction } from "../../actions/formsActions";
import {
  messageShowAction,
  messageHideAction,
} from "../../actions/dataActions";
import axios from "axios";

const DishNew = () => {
  const [isActive, setIsActive] = useState(true);
  const [form, setForm] = useState({
    name: "",
    restaurant: "",
    city: "",
    category: "",
    price: null,
    composition: "",
    weight: "",
    size: "на 100 грамм",
    kcals: 0,
    prots: 0,
    fats: 0,
    carbs: 0,
    inBasket: false,
    inFavorite: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        destroyComponent();
      }
    });
    return () => {
      window.removeEventListener("keydown", destroyComponent);
    };
  }, [isActive]);

  function destroyComponent() {
    setIsActive(false);
    setTimeout(() => {
      dispatch(closeNewDishFormAction);
    }, 300);
  }
  function formHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  async function sendDish(event) {
    event.preventDefault();
    if (form.size === "на 100 грамм") {
      form.kcals = form.kcals * (form.weight / 100);
      form.prots = form.prots * (form.weight / 100);
      form.fats = form.fats * (form.weight / 100);
      form.carbs = form.carbs * (form.weight / 100);
    }
    console.log(form);
    await axios.post("/api/new/send", {
      dish: form,
    });
    dispatch(
      messageShowAction(
        "Спасибо! В ближайшее время мы рассмотрим ваш запрос",
        "message__context--success"
      )
    );
    setTimeout(() => {
      dispatch(messageHideAction());
    }, 3000);
    destroyComponent();
  }
  return (
    <div
      className={`request-form__container ${
        isActive
          ? "request-form__container--active"
          : "request-form__container--hide"
      }`}
    >
      <form className="request-form flex" onSubmit={sendDish}>
        <button
          className="login__close"
          type="button"
          onClick={destroyComponent}
        >
          <span></span>
        </button>
        <div className="request-form__col">
          <div className="request-form__row">
            <label htmlFor="name" className="request-form__label">
              Название блюда:*
            </label>
            <input
              type="text"
              onChange={formHandler}
              name="name"
              id="name"
              className="request-form__input"
              required
            />
          </div>
          <div className="request-form__row">
            <label htmlFor="restaurant" className="request-form__label">
              Ресторан:*
            </label>
            <input
              type="text"
              onChange={formHandler}
              name="restaurant"
              id="restaurant"
              className="request-form__input"
              required
            />
          </div>
          <div className="request-form__row">
            <label htmlFor="category" className="request-form__label">
              Категория:
            </label>
            <select
              name="category"
              id="category"
              onChange={formHandler}
              className="request-form__input"
            >
              <option value="" defaultChecked>
                Не выбрана
              </option>
              <option value="азиатский ланч">Азиатский ланч</option>
              <option value="американский ланч">Американский ланч</option>
              <option value="бургеры">Бургеры</option>
              <option value="гарниры">Гарниры</option>
              <option value="горячее">Горячее</option>
              <option value="десерты">Десерты</option>
              <option value="завтраки">Завтраки</option>
              <option value="закуски">Закуски</option>
              <option value="ланчи">Ланчи</option>
              <option value="легкий ланч">Легкий ланч</option>
              <option value="пицца">Пицца</option>
              <option value="роллы">Роллы</option>
              <option value="салаты">Салаты</option>
              <option value="супы">Супы</option>
              <option value="суши">Суши</option>
              <option value="японский ланч">Японский ланч</option>
              <option value="wok">Wok</option>
            </select>
          </div>
          <div className="request-form__row">
            <label htmlFor="city" className="request-form__label">
              Город:*
            </label>
            <input
              type="text"
              onChange={formHandler}
              name="city"
              id="city"
              className="request-form__input"
              required
            />
          </div>
          <div className="request-form__row">
            <label htmlFor="price" className="request-form__label">
              Цена:
            </label>
            <input
              type="number"
              onChange={formHandler}
              name="price"
              id="price"
              className="request-form__input"
            />
          </div>
          <div className="request-form__row">
            <label htmlFor="weight" className="request-form__label">
              Вес:*
            </label>
            <input
              type="number"
              onChange={formHandler}
              name="weight"
              id="weight"
              className="request-form__input"
              required
            />
          </div>
          <div className="request-form__row">
            <label htmlFor="size" className="request-form__label">
              Расчет КБЖУ:*
            </label>
            <span>
              <input
                type="radio"
                name="size"
                id="sizePortion"
                value="на одну порцию"
                onChange={formHandler}
                required
              />
              <label htmlFor="sizePortion" className="request-form__radio">
                на одну порцию
              </label>
            </span>
            <span>
              <input
                type="radio"
                name="size"
                id="sizeGram"
                value="на 100 грамм"
                onChange={formHandler}
                className="request-form__radio"
                required
              />
              <label htmlFor="sizeGram" className="request-form__radio">
                на 100 грамм
              </label>
            </span>
          </div>
        </div>
        <div className="request-form__col">
          <div className="request-form__row">
            <label htmlFor="kcals" className="request-form__label">
              Калории:*
            </label>
            <input
              type="number"
              onChange={formHandler}
              name="kcals"
              id="kcals"
              className="request-form__input"
              required
              step="0.01"
            />
          </div>
          <div className="request-form__row">
            <label htmlFor="prots" className="request-form__label">
              Белки:*
            </label>
            <input
              type="number"
              onChange={formHandler}
              name="prots"
              id="prots"
              className="request-form__input"
              required
              step="0.01"
            />
          </div>
          <div className="request-form__row">
            <label htmlFor="fats" className="request-form__label">
              Жиры:*
            </label>
            <input
              type="number"
              onChange={formHandler}
              name="fats"
              id="fats"
              className="request-form__input"
              required
              step="0.01"
            />
          </div>
          <div className="request-form__row">
            <label htmlFor="carbs" className="request-form__label">
              Углеводы:*
            </label>
            <input
              type="number"
              onChange={formHandler}
              name="carbs"
              id="carbs"
              className="request-form__input"
              required
              step="0.01"
            />
          </div>
          <div className="request-form__row">
            <label htmlFor="composition" className="request-form__label">
              Состав:
            </label>
            <textarea
              name="composition"
              id="composition"
              rows="10"
              onChange={formHandler}
              className="request-form__input"
            ></textarea>
          </div>
        </div>
        <div className="request-form__col width-100">
          <div className="request-form__row">
            <input
              type="submit"
              value="Отправить"
              className="request-form__submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DishNew;
