const applicationBtn = (props) => {
  return (
    <button className="application-button" onClick={props.action}>
      {props.name}
    </button>
  );
};

export default applicationBtn;
