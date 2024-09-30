import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <main className="grid grid-cols-12 min-h-screen bg-gray-50 ">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-12 sm:col-span-10">
        <Header />
        <div className="p-5 h-[90vh] overflow-auto ">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
