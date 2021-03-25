import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LoginWindow from "./components/login-window/loginWindow";

import { useSelector } from "react-redux";

// import { image } from "../build/static/media/1616663486777bg.jpg";

import "./style/App.css";
import PageContainerLayout from "./layouts/PageContainerLayout";
import Basket from "./components/basket/basket";
import Message from "./components/message/message";
import DishEdit from "./components/forms/DishEdit";
import DishNew from "./components/forms/DishNew";
import NewDishButton from "./components/new-dish-button/NewDishButton";

function App() {
  const loginWindowHandler = useSelector(
    (state) => state.auth.loginWindowHandler
  );
  const formVisibility = useSelector((state) => state.edit.isShown);
  const newDishForm = useSelector((state) => state.edit.newDishForm);
  const message = useSelector((state) => state.api.message);

  return (
    <BrowserRouter>
      <Navbar />
      {message.show && (
        <Message extraClass={message.class} message={message.text} />
      )}
      {loginWindowHandler && <LoginWindow />}
      <PageContainerLayout />
      <Basket />
      {formVisibility && <DishEdit />}
      {newDishForm && <DishNew />}
      <NewDishButton />
      {/* <Footer /> */}
      <form
        method="post"
        action="/api/new/dish-photo"
        encType="multipart/form-data"
        onSubmit={() => {
          return false;
        }}
      >
        <input type="file" name="wallpaper" multiple />
        <input type="submit" />
      </form>
      {/* <img src={image} alt="" height="500" width="400" /> */}
      {/* <form
        class="classCard"
        action="/api/new/photo-upload"
        method="post"
        enctype="multipart/form-data"
        name="nameCard"
        id="cardId"
      >
        <input id="inputId" type="file" name="avatar" />
        <input id="subId" type="submit" name="subCard" value="sub" />
      </form> */}
    </BrowserRouter>
  );
}

export default App;
