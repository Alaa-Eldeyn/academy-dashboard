import { Link } from "react-router-dom";
import { getUser, removeUser } from "../utils/LocalStorage";
import { Icon } from "@iconify/react/dist/iconify.js";

function Header() {
  const user = getUser();
  const handleLogout = () => {
    removeUser();
    window.location.href = "/login";
  };
  return (
    <header className="flex border-b-2 py-3 px-4 sm:px-10 bg-white h-[70px] tracking-wide relative">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <Link to={"/"} className="cursor-pointer">
          <h1 className="font-bold text-xl hidden md:flex text-primary">
            MedLearn Hub
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link to={"/profile"} className="  block" title="My Profile">
              {user?.imageUrl ? (
                <img
                  src={import.meta.env.VITE_BASE_URL + user?.imageUrl}
                  alt=""
                  className="size-10 cursor-pointer text-primary rounded-full p-2 bg-[#FEEFFF]"
                />
              ) : (
                <Icon
                  icon="solar:user-bold"
                  className="size-10 cursor-pointer rounded-full bg-[#FEEFFF] p-2 text-primary"
                />
              )}
            </Link>
          </div>
          <div className="relative">
            <Icon
              onClick={handleLogout}
              icon="heroicons-outline:logout"
              width="24"
              className="size-10 cursor-pointer rounded-full bg-red-50 p-2 text-red-500"
              height="24"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
