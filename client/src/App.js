import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LoginWindow from "./components/login-window/loginWindow";

import { useSelector } from "react-redux";

import "./style/App.css";
import PageContainerLayout from "./layouts/PageContainerLayout";
import Basket from "./components/basket/basket";
import Message from "./components/message/message";
import DishEdit from "./components/forms/DishEdit";

function App() {
  const loginWindowHandler = useSelector(
    (state) => state.auth.loginWindowHandler
  );
  const formVisibility = useSelector((state) => state.edit.isShown);
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
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
