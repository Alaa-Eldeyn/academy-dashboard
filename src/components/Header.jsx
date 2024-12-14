import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser, removeUser } from "../utils/LocalStorage";
import { Icon } from "@iconify/react/dist/iconify.js";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const user = getUser();
  const handleToggleMenu = () => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
    }
    setIsMenuOpen(!isMenuOpen);
  };
  const handleToggleNotifications = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setIsNotificationOpen(!isNotificationOpen);
  };
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
            <Icon
              icon="hugeicons:notification-01"
              onClick={handleToggleNotifications}
              className="size-10 cursor-pointer text-primary rounded-full p-2 bg-[#FEEFFF]"
            />
            {isNotificationOpen && (
              <div className="bg-gray-100 z-20 shadow-md rounded-lg p-1 w-40 absolute right-0 top-14">
                <ul>
                  <li className=" hover:bg-gray-200 px-3 py-2 rounded-lg soft block cursor-pointer">
                    <Link to={"profile"} className="  block">
                      My profile
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            {user?.imageUrl ? (
              <img
                src={user?.imageUrl}
                alt=""
                onClick={handleToggleNotifications}
                className="size-10 cursor-pointer text-primary rounded-full p-2 bg-[#FEEFFF]"
              />
            ) : (
              <Icon
                icon="solar:user-bold"
                onClick={handleToggleMenu}
                className="size-10 cursor-pointer rounded-full bg-[#FEEFFF] p-2 text-primary"
              />
            )}
            <Icon
              onClick={handleToggleMenu}
              icon="icon-park-solid:down-c"
              className=" cursor-pointer absolute top-1/2 -right-2 -translate-y-1/2 text-sm text-primary"
            />
            {isMenuOpen && (
              <div className="bg-gray-100 z-20 shadow-md rounded-lg p-1 w-40 absolute right-0 top-14">
                <ul>
                  <li className=" hover:bg-gray-200 px-3 py-2 rounded-lg soft block cursor-pointer">
                    <Link to={"profile"} className="  block">
                      My profile
                    </Link>
                  </li>
                  <li
                    className=" hover:bg-gray-200 px-3 py-2 text-red-500 rounded-lg soft block cursor-pointer"
                    onClick={() => handleLogout()}
                  >
                    <button className=" block">Log out</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
