import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePhotosFormAction } from "../../actions/formsActions";
import {
  messageShowAction,
  messageHideAction,
} from "../../actions/dataActions";
import axios from "axios";
const NewPhotos = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);

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
    try {
      await axios.post("/api/new/dish-photo");
    } catch (error) {
      console.log(error);
    }
    destroyComponent();
    dispatch(
      messageShowAction(
        "Спасибо! Обязательно проверим вашие фотографии и внесем изменения",
        "message__context--success"
      )
    );
    setTimeout(() => {
      dispatch(messageHideAction());
    }, 2000);
  }

  function destroyComponent() {
    setIsActive(false);
    setTimeout(() => {
      dispatch(closePhotosFormAction);
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
      <form
        className="request-form flex"
        method="post"
        action="/api/new/dish-photo"
        encType="multipart/form-data"
      >
        <button
          className="login__close"
          type="button"
          onClick={destroyComponent}
        >
          <span></span>
        </button>
        <input
          type="file"
          name="wallpaper"
          multiple
          accept="image/jpeg,image/png,image/gif"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewPhotos;
