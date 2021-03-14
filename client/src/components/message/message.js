const Message = (props) => {
  return (
    <p className={`message__context ${props.extraClass}`}>{props.message}</p>
  );
};

export default Message;
