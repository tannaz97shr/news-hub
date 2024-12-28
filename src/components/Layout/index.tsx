import { Outlet } from "react-router-dom";
import Loading from "../Loading";
import Menu from "../Menu";

const Layout = () => {
  return (
    <>
      <Loading />
      <Menu />
      <div className="flex min-h-[100vh] max-w-7xl mx-auto flex-col">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
