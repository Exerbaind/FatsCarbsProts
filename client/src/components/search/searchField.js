import searchIcon from "../../assets/search.svg";
const SearchField = (props) => {
  function inputHandler(e) {
    props.setRestaurant(e.target.value);
  }
  return (
    <div className="search-container">
      <form className="search-form" onSubmit={props.searchAction}>
        <input
          type="text"
          required
          placeholder={props.placeholder}
          className="search-form__search-bar"
          onChange={inputHandler}
        />
        <div className="search-form__search-submit">
          <input type="submit" />
          <img src={searchIcon} alt="" />
        </div>
      </form>
      <p className="search__message">{props.message}</p>
    </div>
  );
};

export default SearchField;
