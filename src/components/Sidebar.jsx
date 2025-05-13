import { Link } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getUser } from "../utils/LocalStorage";

function Sidebar() {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAdmin = getUser().roles?.[0]?.name.toLowerCase() === "admin" 
  const isSuperVisor = getUser().roles?.[0]?.name.toLowerCase() === "supervisor"
  
  let sidebarItem = [];

  if (isAdmin) {
      sidebarItem=[
    {
      link: "/",
      icon: <Icon icon="radix-icons:dashboard" className="text-xl" />,
      title: "Dashboard",
    },
    {
      link: "supervisors",
      icon: <Icon icon="mingcute:user-setting-line" className="text-2xl" />,
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
        {
          link: "pending-deletion-courses",
          title: "Pending Deletion Courses",
          icon: <Icon icon="solar:video-library-outline" className="text-xl" />,
        },
        {
          link: "pending-enrolls",
          title: "Pending Enrolls",
          icon: <Icon icon="solar:video-library-outline" className="text-xl" />,
        },
      ],
    },
    {
      link: "local-subscription",
      icon: (
        <Icon icon="streamline:subscription-cashflow" className="text-2xl" />
      ),
      title: "Subscription",
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
  } else if (isSuperVisor) {
      sidebarItem=[
    {
      link: "categories",
      icon: <Icon icon="ph:network" className="text-2xl" />,
      title: "Categories",
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
  } else {
    sidebarItem=[]
  }

  const handleDropdownClick = (index) => {
    if (index === 4) setIsCoursesOpen(!isCoursesOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        type="button"
        className="fixed bg-[#FEEFFF] rounded-sm items-center p-2 top-4 left-4 text-primary sm:hidden z-10"
      >
        <span className="sr-only">Open sidebar</span>
        <Icon icon="heroicons:bars-3-16-solid" className="text-2xl" />
      </button>

      {isSidebarOpen && (
        <div
          className="fixed soft top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        className={`shadow-lg fixed top-0 left-0 z-50 h-screen soft sm:static sm:!translate-x-0 ${
          isSidebarOpen ? "translate-x-[100%]" : "translate-x-0"
        } `}
        aria-label="Sidebar"
      >
        <div className="h-full p-3 overflow-y-auto bg-white">
          <Link to={"/"} className="cursor-pointer center">
            <h1 className="font-bold text-xl md:flex mt-2 text-primary">
              Practice2Pass
            </h1>
          </Link>
          <ul className="font-medium mt-10">
            {sidebarItem.map((item, index) => (
              <li key={index}>
                <Link
                  to={item?.link || "#"}
                  className={`my-2 font-normal text-sm flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#FEEFFF] dark:hover:bg-[#FEEFFF] group line-clamp-1 ${
                    activeLink?.includes(item.link) ? "bg-[#FEEFFF]" : ""
                  }`}
                  onClick={() => {
                    handleLinkClick(item.link);
                    handleDropdownClick(index);
                  }}
                >
                  <div className="w-6 h-6 text-primary">{item.icon}</div>
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
                {item?.dropdown && isCoursesOpen && (
                  <ul className="pl-4">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.link}
                          className={`my-2 flex items-center py-2 px-4 gap-3 text-gray-900 rounded-lg hover:bg-[#FEEFFF] dark:hover:bg-[#FEEFFF] group line-clamp-1 ${
                            activeLink?.includes(subItem.link)
                              ? "bg-[#FEEFFF]"
                              : ""
                          }`}
                          onClick={() => handleLinkClick(subItem.link)}
                        >
                          <div className="w-4 h-4 text-primary">
                            {subItem.icon}
                          </div>
                          <span className="text-sm font-normal">
                            {subItem.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
