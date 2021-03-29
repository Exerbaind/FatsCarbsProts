import {
  openFormsMenuAction,
  closeFormsMenuAction,
  openNewDishFormAction,
  openPhotosFormAction,
} from "../../actions/formsActions";
import { useDispatch, useSelector } from "react-redux";
const NewDishButton = () => {
  const dispatch = useDispatch();
  const formsMenu = useSelector((state) => state.forms.formsMenu);
  return (
    <div className="new-dish__action">
      <ul
        className={`new-dish__menu ${
          formsMenu ? "new-dish__menu--active" : ""
        }`}
      >
        <li
          className="new-dish__menu-item"
          onClick={() => dispatch(openNewDishFormAction)}
        >
          Добавить блюдо
        </li>
        {/* <li
          className="new-dish__menu-item"
          onClick={() => dispatch(openPhotosFormAction)}
        >
          Загрузить фотографии
        </li> */}
      </ul>
      <button
        className="new-dish__menu-handler"
        onClick={
          formsMenu
            ? () => dispatch(closeFormsMenuAction)
            : () => dispatch(openFormsMenuAction)
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="512"
          height="512"
          viewBox="0 0 426.66667 426.66667"
          className={`new-dish__icon ${
            formsMenu ? "new-dish__icon--active" : ""
          }`}
        >
          <g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"
              fill="#fffefe"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default NewDishButton;
