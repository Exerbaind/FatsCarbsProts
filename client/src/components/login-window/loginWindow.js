import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginWindowHide } from "../../actions/authActions";
const RegisterPage = () => {
  const [isActive, setIsActive] = useState(true);

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
      dispatch(loginWindowHide);
    }, 300);
  }

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const formHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/auth/login", { ...form }).then((jwt) => {
        localStorage.setItem("token", jwt.data.token);
        window.location.reload();
      });
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  return (
    <div
      className={`login__container ${
        isActive ? "login__container--show" : "login__container--hide"
      }`}
    >
      <button className="login__close" onClick={destroyComponent}>
        <span></span>
      </button>
      <form onSubmit={registerHandler} className="login__form">
        <p className="form__title">Вход/Регистрация</p>
        <div className="form__row">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Почта"
            onChange={formHandler}
            required
            className={`form__input ${form.email ? "form__input--full" : ""} ${
              errors ? "form__input--error" : ""
            }`}
          />
        </div>
        <div className="form__row">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            onChange={formHandler}
            required
            className={`form__input ${form.password ? "form__input--full" : ""}
            ${errors ? "form__input--error" : ""}`}
          />
        </div>

        <input
          type="submit"
          className="form__submit"
          value="войти"
          disabled={form.email && form.password ? false : true}
        />
        {errors && <p className="form__error">{errors}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
