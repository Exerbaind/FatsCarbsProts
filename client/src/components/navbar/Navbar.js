import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loginWindowShow } from "../../actions/authActions";
import ApplicationButton from "../application-components/application-button/applicationBtn";

import { NavLink } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const [mobileMenuHandler, setMobileMenuHandler] = useState(false);
  const isLogged = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.admin);
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.reload();
  }

  function mobileMenuToggle() {
    setMobileMenuHandler(!mobileMenuHandler);
  }

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div
          className={`navbar__mobile ${
            mobileMenuHandler ? "navbar__mobile--active" : ""
          }`}
          onClick={mobileMenuToggle}
        >
          <span></span>
        </div>
        <div
          className={`navbar__menu ${
            mobileMenuHandler ? "navbar__menu--active" : ""
          }`}
        >
          <nav className="navbar__navigation">
            <ul className="navigation__list" onClick={mobileMenuToggle}>
              {/* <li className="navigation__item">
                <NavLink
                  to="/"
                  exact
                  className="navigation__link"
                  activeClassName="navigation__link--active"
                >
                  Главная
                </NavLink>
              </li> */}
              {/* <li className="navigation__item">
                <NavLink
                  to="/restaurants"
                  className="navigation__link"
                  activeClassName="navigation__link--active"
                >
                  Рестораны
                </NavLink>
              </li> */}
              <li className="navigation__item">
                <NavLink
                  to="/"
                  className="navigation__link"
                  activeClassName="navigation__link--active"
                  exact
                >
                  Блюда
                </NavLink>
              </li>
              {/* {!isAdmin && (
                <li className="navigation__item">
                  <NavLink
                    to="/about"
                    className="navigation__link"
                    activeClassName="navigation__link--active"
                    exact
                  >
                    О приложении
                  </NavLink>
                </li>
              )} */}
              {isLogged && (
                <li className="navigation__item">
                  <NavLink
                    to="/favourites"
                    className="navigation__link"
                    activeClassName="navigation__link--active"
                  >
                    Избранное
                  </NavLink>
                </li>
              )}
              {isAdmin && (
                <li className="navigation__item">
                  <NavLink
                    to="/resolve/food-edit"
                    className="navigation__link"
                    activeClassName="navigation__link--active"
                  >
                    Надо изменить
                  </NavLink>
                </li>
              )}
              {isAdmin && (
                <li className="navigation__item">
                  <NavLink
                    to="/resolve/new-food"
                    className="navigation__link"
                    activeClassName="navigation__link--active"
                  >
                    Надо добавить
                  </NavLink>
                </li>
              )}

              {/* {isLogged && (
                <li className="navigation__item">
                  <NavLink
                    to="/profile"
                    className="navigation__link"
                    activeClassName="navigation__link--active"
                  >
                    Профиль
                  </NavLink>
                </li>
              )} */}
            </ul>
          </nav>
        </div>
        <div className="navbar__login">
          {isLogged ? (
            <ApplicationButton name="Выйти" action={logout} />
          ) : (
            <ApplicationButton
              name="Присоединиться"
              action={() => dispatch(loginWindowShow)}
            />
          )}
        </div>
      </div>
      {/* <div className="navbar__container">
        <div className="navbar__search-container">
          <input
            type="text"
            placeholder="Найти ресторан"
            className="search__area"
          />
        </div>
        <div className="navbar__profile">
          {isLogged ? (
            <button className="navbar__profile-button" onClick={logout}>
              Выйти
            </button>
          ) : (
            <button
              className="navbar__profile-button"
              onClick={() => dispatch(loginWindowShow)}
            >
              Присоединиться
            </button>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
