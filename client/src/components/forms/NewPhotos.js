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
  let file;

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

  function handleFile(event) {
    file = event.target.value;
  }

  async function sendData(event) {
    event.preventDefault();
    file = file.split("\\");
    file = file[file.length - 1];
    try {
      await axios.post("/api/new/dish-photo", {
        file: file,
      });
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
        className="request-form"
        // method="post"
        // action="/api/new/dish-photo"
        encType="multipart/form-data"
        onSubmit={sendData}
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
          accept="image/jpeg,image/png,image/gif"
          onChange={handleFile}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewPhotos;
