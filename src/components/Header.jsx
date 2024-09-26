import { useState } from "react";
import { Link } from "react-router-dom";
import { removeUser } from "../utils/LocalStorage";
import { Icon } from "@iconify/react/dist/iconify.js";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const handleLogout = () => {
    removeUser();
    window.location.href = "/login";
  };
  return (
    <header className="flex border-b-2 py-3 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative">
      <div className="flex flex-wrap items-center justify-between lg:gap-y-4 gap-y-6 gap-x-4 w-full">
        <Link to={"/"} className="cursor-pointer">
          <h1 className="font-bold text-xl hidden lg:flex md:flex text-primary">
            MedLearn Hub
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon
              icon="hugeicons:notification-01"
              onClick={handleToggleNotifications}
              className="w-10 h-10 cursor-pointer text-primary rounded-full p-2 bg-[#FEEFFF]"
            />
            {isNotificationOpen && (
              <div className="bg-gray-100 z-20 shadow-md py-3 px-2 min-w-[200px] absolute right-5 top-16">
                <ul className="space-y-1.5">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-primary"
                    >
                      Notification 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-primary"
                    >
                      Notification 2
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <Icon
              icon="solar:user-bold"
              onClick={handleToggleMenu}
              className="w-10 h-10 cursor-pointer rounded-full bg-[#FEEFFF] p-2 text-primary"
            />
            <Icon
              onClick={handleToggleMenu}
              icon="icon-park-solid:down-c"
              className=" cursor-pointer absolute top-1/2 -right-2 -translate-y-1/2 text-sm text-primary"
            />
            {isMenuOpen && (
              <div className="bg-gray-100 z-20 shadow-md py-3 px-2 min-w-[150px] absolute right-0 top-14">
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      to={"profile"}
                      className="text-sm text-gray-500 hover:text-primary"
                    >
                      My profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => handleLogout()}
                      className="text-sm text-gray-500 hover:text-primary"
                    >
                      Log out
                    </button>
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
