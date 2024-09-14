import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdWindow } from "react-icons/md";
import { TbUserCog } from "react-icons/tb";

function Sidebar() {
  return (
<>   
   <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-4 mt-1  bg-white  text-gray-600  sm:hidden hove">
      <span class="sr-only">Open sidebar</span>
      <FaBarsStaggered className="text-2xl" />
   </button>
   <aside id="default-sidebar" className="shadow-lg  fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-white">
      <Link to={"/"} className='cursor-pointer'>
          <h1 className='font-bold text-xl'>MedLearn Hub</h1>
        </Link>
         <ul class="space-y-2 font-medium mt-10">
            <li>
               <Link to={"/"} class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-200 group">
                   <MdWindow className="text-2xl" />
                  <span class="ms-3 text-lg">Dashboard</span>
               </Link>
            </li>
            <li>
               <Link to={"supervisors"} class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-200 group">
                   <TbUserCog  className="text-2xl" />
                  <span class="ms-3 text-lg">Supervisors</span>
               </Link>
            </li>  
         </ul>
      </div>
   </aside>
    </>
  )
}

export default Sidebar