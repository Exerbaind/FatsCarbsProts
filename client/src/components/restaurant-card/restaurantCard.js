import { useState } from "react";
import { NavLink } from "react-router-dom";
import ApplicationButton from "../application-components/application-button/applicationBtn";

const RestaurantCard = ({ place }) => {
  const [descriptionHandler, setDescriptionHandler] = useState(false);
  function descriptionToggle() {
    setDescriptionHandler(!descriptionHandler);
  }
  return (
    <div className="place__card">
      <div className="card__image-container">
        <img
          src={place.images[0]}
          alt={`Ресторан ${place.name}`}
          className="card__image"
        />
        <ApplicationButton name="Описание" action={descriptionToggle} />
        <div
          className={`card__description-container ${
            descriptionHandler
              ? "card__description-container--show"
              : "card__description-container--hide"
          }`}
        >
          <p className="card__description">{place.description}</p>
        </div>
      </div>

      <div className="card__content">
        <div className="card__header">
          <h5 className="card__name">{place.name}</h5>
          <img src={place.metro.icon} alt="" className="card__metro-icon" />
          <p className="card__metro-name">{place.metro.name}</p>
        </div>
        <div className="place__location">
          <p className="card__city">{place.city}</p>
          <a
            href={place.address.link}
            className="card__address"
            target="_blank"
            rel="noreferrer"
          >
            {place.address.text}
          </a>
        </div>
        <div className="kitchen-list">
          {place.kitchen.map((item, index) => {
            return (
              <p className="kitchen-item" key={index}>
                {item}
              </p>
            );
          })}
        </div>
        <NavLink
          to={`/restaurant/${place.id}`}
          className="place__card-link"
        ></NavLink>
      </div>
    </div>
  );
};

export default RestaurantCard;
