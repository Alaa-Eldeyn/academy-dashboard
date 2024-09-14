import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar"
const Layout = () => {
  return (
    <main className="flex">
      <div>
         <Sidebar/>
      </div>
      <div className="w-full">
         <Header/>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
