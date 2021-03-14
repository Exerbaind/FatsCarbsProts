import preloader from "../../assets/preloader.svg";
const Preloader = () => {
  return (
    <div className="preloader__container">
      <img src={preloader} alt="" className="preloader__icon" />
    </div>
  );
};

export default Preloader;
