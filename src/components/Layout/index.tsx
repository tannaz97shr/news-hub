import { Outlet } from "react-router-dom";
import Menu from "../Menu";

const Layout = () => {
  return (
    <div className="flex min-h-[100vh] max-w-7xl mx-auto flex-col">
      <Menu />
      <div className="p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
