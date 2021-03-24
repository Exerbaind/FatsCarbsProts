import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeFormAction } from "../../actions/editActions";
import {
  messageShowAction,
  messageHideAction,
} from "../../actions/dataActions";
import axios from "axios";
const DishEdit = () => {
  const dispatch = useDispatch();
  const currentDish = useSelector((state) => state.edit.currentDish);
  const [isActive, setIsActive] = useState(true);
  const [formData, setFormData] = useState({ ...currentDish });

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
  async function sendData(event) {
    event.preventDefault();
    formData.time = Date.now();
    formData.kcals = +formData.kcals;
    formData.prots = +formData.prots;
    formData.fats = +formData.fats;
    formData.carbs = +formData.carbs;
    try {
      await axios.post("/api/edit/edit-dish", {
        dish: formData,
      });
    } catch (error) {
      console.log(error);
    }
    destroyComponent();
    dispatch(
      messageShowAction(
        "Спасибо! Обязательно проверим данное блюдо",
        "message__context--success"
      )
    );
    setTimeout(() => {
      dispatch(messageHideAction());
    }, 2000);
  }

  function formHandler(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function destroyComponent() {
    setIsActive(false);
    setTimeout(() => {
      dispatch(closeFormAction);
    }, 300);
  }
  return (
    <div
      className={`request-form__container ${
        isActive
          ? "request-form__container--active"
          : "request-form__container--hide"
      }`}
    >
      <form className="request-form" onSubmit={sendData}>
        <button
          className="login__close"
          type="button"
          onClick={destroyComponent}
        >
          <span></span>
        </button>
        <div className="request-form__row">
          <label htmlFor="name" className="request-form__label">
            Название блюда:
          </label>
          <input
            type="text"
            value={currentDish.name}
            disabled
            name="name"
            id="name"
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
            placeholder={currentDish.price || "цена не указана"}
            onChange={formHandler}
            name="price"
            id="price"
            className="request-form__input"
            required
          />
        </div>
        <div className="request-form__row">
          <label htmlFor="weight" className="request-form__label">
            Вес:
          </label>
          <input
            type="number"
            placeholder={currentDish.weight}
            onChange={formHandler}
            name="weight"
            id="weight"
            className="request-form__input"
            required
          />
        </div>
        <div className="request-form__row">
          <label htmlFor="size" className="request-form__label">
            Расчет КБЖУ:
          </label>
          <input
            type="text"
            placeholder="на 100 грамм / на одну порцию"
            onChange={formHandler}
            name="size"
            id="size"
            className="request-form__input"
            required
          />
        </div>
        <div className="request-form__row">
          <label htmlFor="kcal" className="request-form__label">
            Калории:
          </label>
          <input
            type="number"
            placeholder={currentDish.kcals.toFixed(2)}
            onChange={formHandler}
            name="kcal"
            id="kcal"
            className="request-form__input"
            required
            step="0.01"
          />
        </div>
        <div className="request-form__row">
          <label htmlFor="prots" className="request-form__label">
            Белки:
          </label>
          <input
            type="number"
            placeholder={currentDish.prots.toFixed(2)}
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
            Жиры:
          </label>
          <input
            type="number"
            placeholder={currentDish.fats.toFixed(2)}
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
            Углеводы:
          </label>
          <input
            type="number"
            placeholder={currentDish.carbs.toFixed(2)}
            onChange={formHandler}
            name="carbs"
            id="carbs"
            className="request-form__input"
            required
            step="0.01"
          />
        </div>
        <div className="request-form__row">
          <input
            type="submit"
            value="Отправить"
            className="request-form__submit"
          />
        </div>
      </form>
    </div>
  );
};

export default DishEdit;
