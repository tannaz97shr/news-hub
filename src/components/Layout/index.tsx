import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Loading from "../Loading";
import Menu from "../Menu";

const Layout = () => {
  return (
    <>
      <div className="flex min-h-[100vh] flex-col bg-background-primary">
        <Loading />
        <Menu />
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full h-full flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
