import { Outlet } from "react-router-dom";
import Loading from "../Loading";
import Menu from "../Menu";

const Layout = () => {
  return (
    <>
      <div className="flex min-h-[100vh] flex-col bg-background-primary">
        <Loading />
        <Menu />
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
