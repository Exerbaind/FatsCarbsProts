import axios from "axios";
const DishPhotoCard = ({ photo }) => {
  async function deletePhoto(id) {
    await axios.post("/api/photo/delete", {
      id: id,
    });
    window.location.reload();
  }

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
        <button
          className="photo-card__button delete"
          onClick={() => deletePhoto(photo._id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default DishPhotoCard;
