import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePhotosFormAction } from "../../actions/formsActions";
import {
  messageShowAction,
  messageHideAction,
} from "../../actions/dataActions";
import axios from "axios";
import imageCompression from "browser-image-compression";
import sendIcon from "../../assets/send.svg";
const NewPhotos = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const [files, setFiles] = useState();
  const compressedFiles = [];
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    restaurant: "",
    city: "",
  });

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

  function formHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function sendData(event) {
    event.preventDefault();
    setSending(true);
    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };
    for (let i = 0; i < files.length; i++) {
      let compressedFile = await imageCompression(files[i], options);
      compressedFiles.push(compressedFile);
    }
    const data = new FormData();
    for (let i = 0; i < compressedFiles.length; i++) {
      data.append("restaurant", form.restaurant);
      data.append("city", form.city);
      data.append("file", compressedFiles[i]);
    }

    try {
      await axios.post("/api/photo/upload", data);
    } catch (error) {
      console.log(error);
      setSending(false);
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
        <div className="request-form__row file">
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/gif"
            className="request-from__send-file"
            multiple
            required
            onChange={(event) => {
              const file = event.target.files;
              setFiles(file);
            }}
          />
          <label htmlFor="file" className="request-form__file-label">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                className="request-from__send-file-icon"
              >
                <g>
                  <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path
                        d="M472,313v139c0,11.028-8.972,20-20,20H60c-11.028,0-20-8.972-20-20V313H0v139c0,33.084,26.916,60,60,60h392    c33.084,0,60-26.916,60-60V313H472z"
                        fill="#ffffff"
                        data-original="#000000"
                        className="send-file-icon__platform"
                      />
                    </g>
                  </g>
                  <g xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <polygon
                        points="352,235.716 276,311.716 276,0 236,0 236,311.716 160,235.716 131.716,264 256,388.284 380.284,264   "
                        fill="#ffffff"
                        data-original="#000000"
                        className="send-file-icon__arrow"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span>
              {files ? `Выбрано фоток: ${files.length}` : "Выберите фотки"}
            </span>
          </label>
        </div>
        <span className="request-form__message">
          максимальное количество фото 10
        </span>
        {sending ? (
          <div className="request-form__row sending">
            <p>Секундочку, отправляем...</p>
            <img src={sendIcon} alt="" />
          </div>
        ) : (
          <div className="request-form__row">
            <input
              type="submit"
              value="Отправить"
              className="request-form__submit"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default NewPhotos;
