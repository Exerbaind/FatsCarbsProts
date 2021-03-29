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
import NewPhotos from "./components/forms/NewPhotos";
import Footer from "./components/footer/Footer";

function App() {
  const loginWindowHandler = useSelector(
    (state) => state.auth.loginWindowHandler
  );
  const dishEditForm = useSelector((state) => state.forms.editForm);
  const dishNewForm = useSelector((state) => state.forms.newDishForm);
  const photosForm = useSelector((state) => state.forms.photosForm);
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
      {dishEditForm && <DishEdit />}
      {dishNewForm && <DishNew />}
      {photosForm && <NewPhotos />}
      <NewDishButton />
      {/* <form
        method="post"
        action="/api/new/dish-photo"
        encType="multipart/form-data"
        onSubmit={() => {
          return false;
        }}
      >
        <input
          type="file"
          name="wallpaper"
          multiple
          accept="image/jpeg,image/png,image/gif"
        />
        <input type="submit" />
      </form> */}
    </BrowserRouter>
  );
}

export default App;
