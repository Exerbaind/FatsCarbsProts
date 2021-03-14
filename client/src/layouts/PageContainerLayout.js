import { useRoutes } from "../routes";
const PageContainerLayout = () => {
  const routes = useRoutes(false);
  return (
    <div className="container">
      <div className="inner-container">
        <div className="App">{routes}</div>
      </div>
    </div>
  );
};

export default PageContainerLayout;
