import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdWindow } from "react-icons/md";
import { TbUserCog } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LiaFileVideoSolid } from "react-icons/lia";

function Sidebar() {
   const [isCoursesOpen, setIsCoursesOpen] = useState(false);
   const [activeLink, setActiveLink] = useState("/");

   const sidebarItem = [
      {
         link:"/",
         icon:<MdWindow className="text-2xl" />,
         title:"Dashboard"
      },
      {
         link:"supervisors",
         icon: <TbUserCog  className="text-2xl" />,
         title:"Supervisors"
      },
      {
         link:"users",
         icon: <FaUsers   className="text-2xl" />,
         title:"Users"
      },
      {
         link:"categories",
         icon: <MdOutlineCategory  className="text-2xl" />,
         title:"Categories"
      },
      {
         title: "Courses",
         subIcon:<FaChevronDown />,
         icon: <LiaFileVideoSolid  className="text-2xl" />,
         dropdown: true,
         items: [
            { link: "/published-courses", title: "Published Courses" },
            { link: "/pending-courses", title: "Pending Courses" }
         ]
      }
   ];

   const handleDropdownClick = (index) => {
      if (index === 4) setIsCoursesOpen(!isCoursesOpen);
   };

   const handleLinkClick = (link) => {
      setActiveLink(link);
   };

   return (
   <>   
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="fixed bg-slate-300 rounded-sm items-center p-3 top-3 left-6 text-gray-600 sm:hidden ">
         <span className="sr-only">Open sidebar</span>
         <FaBarsStaggered className="text-2xl" />
      </button>

      <aside id="default-sidebar" className="shadow-lg fixed top-0 left-0 z-50 w-[210px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
         <div className="h-full px-3 py-6 overflow-y-auto bg-white">
            <Link to={"/"} className="cursor-pointer">
               <h1 className="font-bold text-xl lg:flex md:flex">MedLearn Hub</h1>
            </Link>
            <ul className="font-medium mt-10">
               {sidebarItem.map((item, index) => (
                  <li key={index}>
                     <Link
                        to={item.link || "#"}
                        className={`my-2 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 group ${activeLink === item.link ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                           handleLinkClick(item.link);
                           handleDropdownClick(index);
                        }}
                     >
                        {item.icon}
                        <span className="ms-3 text-lg flex items-center">
                            <span>{item.title}</span>
                            <span className="ml-10 text-sm">{item.subIcon}</span>
                           </span>
                     </Link>
                     {item.dropdown && isCoursesOpen && (
                        <ul className="pl-8 mt-2">
                           {item.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                 <Link
                                    to={subItem.link}
                                    className={`my-2 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 group ${activeLink === subItem.link ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleLinkClick(subItem.link)}
                                 >
                                    {subItem.title}
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
