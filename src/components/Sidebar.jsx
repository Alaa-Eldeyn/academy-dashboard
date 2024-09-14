import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdWindow } from "react-icons/md";
import { TbUserCog } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";

function Sidebar() {
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
   ]
  return (
<>   
   <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="fixed bg-slate-300 rounded-sm  items-center p-3 top-3 left-6    text-gray-600  sm:hidden ">
      <span class="sr-only">Open sidebar</span>
      <FaBarsStaggered className="text-2xl" />
   </button>

   <aside id="default-sidebar" className="shadow-lg  fixed top-0 left-0 z-50 w-[210px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-6 overflow-y-auto bg-white">
      <Link to={"/"} className='cursor-pointer' >
          <h1 className='font-bold text-xl lg:flex md:flex '>MedLearn Hub</h1>
        </Link>
         <ul class="font-medium mt-10">
            {
               sidebarItem.map((item,index)=>{
                  return(
                  <li key={index}>
                     <Link to={item.link} class="my-2 flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-200 group">
                         {item.icon}
                        <span class="ms-3 text-lg">{item.title}</span>
                     </Link>
                  <hr /> 
                  </li>
                  )
               })
            } 
         </ul>
      </div>
   </aside>
    </>
  )
}

export default Sidebar