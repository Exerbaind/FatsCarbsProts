const DishPhotoCard = ({ photo }) => {
  return (
    <div className="photo-card">
      <img
        src={`/images/${photo.filename}`}
        alt=""
        className="photo-card__image"
      />
      <div className="photo-card__info">
        <p className="photo-card__restaurant">{photo.restaurant}</p>
        <p className="photo-card__city">{photo.city}</p>
      </div>
    </div>
  );
};

export default DishPhotoCard;
