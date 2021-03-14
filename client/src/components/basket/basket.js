import { useSelector, useDispatch } from "react-redux";
import {
  openBasketAction,
  closeBasketAction,
  // clearBasketAction,
} from "../../actions/basketAction";

import BasketDishes from "./basket-dishes/basketDishes";
import ApplicationBtn from "../application-components/application-button/applicationBtn";
const Basket = () => {
  const isOpened = useSelector((state) => state.basket.isOpened);
  const basketItems = useSelector((state) => state.basket.basketItems);
  const totalKcal = useSelector((state) => state.basket.totalKcal);
  const totalProts = useSelector((state) => state.basket.totalProts);
  const totalFats = useSelector((state) => state.basket.totalFats);
  const totalCarbs = useSelector((state) => state.basket.totalCarbs);

  const dispatch = useDispatch();

  function openBasket() {
    dispatch(openBasketAction);
  }
  function closeBasket() {
    dispatch(closeBasketAction);
  }
  // function clearBasket() {
  //   basketItems.map((item) => (item.inBasket = false));
  //   dispatch(clearBasketAction);
  // }
  return (
    <div className={`basket ${isOpened ? "basket--active" : ""}`}>
      <div className="basket__field">
        <h5 className="basket__title">Ваша еда</h5>
        <div className="basket__goods">
          {basketItems.length ? (
            basketItems.map((item) => {
              return <BasketDishes dish={item} key={item.id} />;
            })
          ) : (
            <p className="basket__empty">тут пока ничего нет</p>
          )}
        </div>
        <div className="basket__nutritional">
          <div className="basket__nutritional-item">
            <p className="basket__nutritional-item-name">калории</p>
            <p className="basket__nutritional-item-value">
              {totalKcal.toFixed(2)}
            </p>
          </div>
          <div className="basket__nutritional-item">
            <p className="basket__nutritional-item-name">белки</p>
            <p className="basket__nutritional-item-value">
              {totalProts.toFixed(2)}
            </p>
          </div>
          <div className="basket__nutritional-item">
            <p className="basket__nutritional-item-name">жиры</p>
            <p className="basket__nutritional-item-value">
              {totalFats.toFixed(2)}
            </p>
          </div>
          <div className="basket__nutritional-item">
            <p className="basket__nutritional-item-name">углеводы</p>
            <p className="basket__nutritional-item-value">
              {totalCarbs.toFixed(2)}
            </p>
          </div>
        </div>
        <ApplicationBtn name="Закрыть" action={closeBasket} />
      </div>
      <div
        className="basket__icon"
        onClick={isOpened ? closeBasket : openBasket}
      >
        {basketItems.length > 0 && (
          <p className="basket__amount">{basketItems.length}</p>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="512"
          height="512"
          x="0"
          y="0"
          viewBox="0 0 480.38 480.38"
          style={{ enableBackground: "new 0 0 512 512" }}
          xmlSpace="preserve"
          className="basket__image"
        >
          <g>
            <g
              xmlns="http://www.w3.org/2000/svg"
              className={`basket__image-fork ${
                isOpened ? "basket__image-fork--active" : ""
              }`}
            >
              <g>
                <path
                  d="M192.714,0h-32c-22.08,0.026-39.974,17.92-40,40v78.008c0.026,18.326,4.292,36.397,12.464,52.8    c7.525,15.078,11.213,31.78,10.736,48.624l-6.4,220.376c-0.757,21.636,16.168,39.79,37.805,40.547    c21.636,0.757,39.79-16.168,40.547-37.805c0.032-0.914,0.032-1.829,0-2.743l-6.4-220.352c-0.475-16.837,3.213-33.53,10.736-48.6    c8.195-16.411,12.478-34.497,12.512-52.84V40C232.688,17.92,214.795,0.027,192.714,0z M216.714,118.016    c-0.02,15.844-3.708,31.468-10.776,45.648c-8.705,17.433-12.972,36.746-12.424,56.224l6.4,220.32    c0.184,6.261-2.191,12.327-6.576,16.8c-9.23,9.033-23.986,9.033-33.216,0c-4.391-4.458-6.777-10.513-6.608-16.768l6.4-220.344    c0.552-19.48-3.713-38.795-12.416-56.232c-7.071-14.182-10.762-29.809-10.784-45.656V40c0.042-10.134,6.445-19.15,16-22.528V112    h16V16h16v96h16V17.472c9.555,3.378,15.958,12.394,16,22.528V118.016z"
                  fill="#ffffff"
                />
              </g>
            </g>
            <g
              xmlns="http://www.w3.org/2000/svg"
              className={`basket__image-knife ${
                isOpened ? "basket__image-knife--active" : ""
              }`}
            >
              <g>
                <path
                  d="M352.714,239.84V8c0-4.418-3.582-8-8-8c-27.458-0.087-52.17,16.643-62.288,42.168    c-22.079,55.207-23.217,116.58-3.2,172.568l9.472,26.512l-6.848,198.496c-0.755,21.482,16.048,39.508,37.529,40.263    c21.482,0.755,39.508-16.048,40.263-37.529c0.032-0.911,0.032-1.823,0-2.733L352.714,239.84z M297.282,48.112    c6.636-16.743,21.637-28.724,39.432-31.496V232h-34.4l-8.088-22.64C275.539,157.038,276.625,99.689,297.282,48.112z     M337.194,457.008c-9.137,9.016-23.823,9.016-32.96,0c-4.328-4.465-6.64-10.506-6.4-16.72L304.442,248h32.544l6.632,192.288    C343.852,446.505,341.531,452.547,337.194,457.008z"
                  fill="#ffffff"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Basket;
