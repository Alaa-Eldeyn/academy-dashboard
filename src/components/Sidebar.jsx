import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

function Sidebar() {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const sidebarItem = [
    {
      link: "/",
      icon: <Icon icon="radix-icons:dashboard" className="text-xl" />,
      title: "Dashboard",
    },
    {
      link: "supervisors",
      icon: <Icon icon="flowbite:user-settings-outline" className="text-3xl" />,
      title: "Supervisors",
    },
    {
      link: "users",
      icon: <Icon icon="solar:user-outline" className="text-2xl" />,
      title: "Users",
    },
    {
      link: "categories",
      icon: <Icon icon="ph:network" className="text-2xl" />,
      title: "Categories",
    },
    {
      title: "Courses",
      subIcon: <Icon icon="mingcute:right-line" className="text-xl " />,
      icon: <Icon icon="solar:video-library-outline" className="text-2xl" />,
      dropdown: true,
      items: [
        {
          link: "pending-courses",
          title: "Pending Courses",
          icon: <Icon icon="solar:video-library-outline" className="text-xl" />,
        },
        {
          link: "published-courses",
          title: "Published Courses",
          icon: <Icon icon="solar:video-library-outline" className="text-xl" />,
        },
      ],
    },
    {
      link: "exams",
      icon: <Icon icon="hugeicons:note-edit" className="text-2xl" />,
      title: "Exams",
    },
    {
      link: "blogs",
      icon: <Icon icon="carbon:blog" className="text-2xl" />,
      title: "Blogs",
    },
    {
      link: "books",
      icon: <Icon icon="solar:book-outline" className="text-2xl" />,
      title: "Medical Books",
    },
  ];

  const handleDropdownClick = (index) => {
    if (index === 4) setIsCoursesOpen(!isCoursesOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="fixed bg-slate-300 rounded-sm items-center p-3 top-3 left-6 text-gray-600 sm:hidden z-10"
      >
        <span className="sr-only">Open sidebar</span>
        <FaBarsStaggered className="text-2xl" />
      </button>

      <aside
        id="default-sidebar"
        className="shadow-lg fixed sm:static top-0 left-0 z-50 h-screen soft -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full p-3 overflow-y-auto bg-white">
          <Link to={"/"} className="cursor-pointer">
            <h1 className="font-bold text-xl md:flex mt-2">MedLearn Hub</h1>
          </Link>
          <ul className="font-medium mt-6">
            {sidebarItem.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link || "#"}
                  className={`my-1 font-normal text-sm flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 group line-clamp-1 ${
                    activeLink?.includes(item.link) ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    handleLinkClick(item.link);
                    handleDropdownClick(index);
                  }}
                >
                  <div className="w-6 h-6">{item.icon}</div>
                  <span className="ms-3 text-lg flex items-center">
                    <span>{item.title}</span>
                    <span
                      className={`ml-10 text-sm soft ${
                        isCoursesOpen ? "rotate-90" : ""
                      }`}
                    >
                      {item.subIcon}
                    </span>
                  </span>
                </Link>
                {item.dropdown && isCoursesOpen && (
                  <ul className="pl-8 mt-2">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.link}
                          className={`my-2 flex items-center p-2 gap-3 text-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-200 group ${
                            activeLink?.includes(subItem.link)
                              ? "bg-gray-200"
                              : ""
                          }`}
                          onClick={() => handleLinkClick(subItem.link)}
                        >
                          <div className="w-4 h-4">{subItem.icon}</div>
                          <span className="text-sm font-normal">
                            {subItem.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
