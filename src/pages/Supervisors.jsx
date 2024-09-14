import { TbUserStar } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";


function Supervisors() {
  return (
    <div className="flex-1 flex">
    {/* to genrate space  */}
    <div className=" bg-white w-60  flex-col hidden md:flex sm:hidden" id="sideNav">
    </div>

    <div className="flex-1 -ml-[65px] sm:ml-72 md:ml-5 lg:ml-4 ">
        <h1 className="flex font-bold items-center gap-2">
          <TbUserStar className="text-xl" />
          Supervisors
        </h1>
        <div class="bg-white flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input type='email' placeholder='Search Something...' class="w-full outline-none bg-white pl-4 text-sm" />
        <button type='button'
          class="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5">Search</button>
      </div>
        <div class="overflow-x-auto font-[sans-serif]">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-100 whitespace-nowrap">
          <tr>
          <td class="pl-4 w-8">
              <label for="checkbox1" class="text-black text-sm"></label>
               <input id="checkbox1" type="checkbox"
               class="w-4 h-4 mr-3 focus:ring-1 focus:ring-offset-slate-200 focus:ring-offset-4 focus:ring-[#007bff]" />
            </td>

            <th>
                #ID
            </th>
            <th class="p-4 text-left text-sm font-semibold text-black">
            Full Name
            </th>
            <th class="p-4 text-left text-sm font-semibold text-black">
              Email
            </th>
            <th class="p-4 text-left text-sm font-semibold text-black">
              Phone
            </th>
            <th class="p-4 text-left text-sm font-semibold text-black">
              Action
            </th>
          </tr>
        </thead>

        <tbody class="whitespace-nowrap divide-y divide-gray-200">
          <tr>
            <td class="pl-4 w-8">
              <label for="checkbox1" class="text-black text-sm"></label>
               <input id="checkbox1" type="checkbox"
               class="w-4 h-4 mr-3 focus:ring-1 focus:ring-offset-slate-200 focus:ring-offset-4 focus:ring-[#007bff]" />
            </td>
            <td class="pl-4 w-8">
              1
            </td>
            <td class="p-4 text-sm">
              <p class="text-sm text-black">Gladys Jones</p>
            </td>
            <td class="p-4 text-sm">
            hisham.mosa.910@gmail.com
            </td>
            <td class="px-6 py-3">
               01024563699878
            </td>
           
            <td class="px-6 py-3 flex items-center gap-3">
                <button className="bg-gray-200 p-1 rounded-md flex items-center gap-1">
                   <MdDelete className="text-lg"/>
                    Delete
                </button>
                <button className="bg-gray-200 p-1 rounded-md flex items-center gap-1">
                   <IoEyeOutline  className="text-lg"/>
                    View
                </button>
            </td>
          </tr>
        </tbody>
      </table>



      <div class="md:flex m-4">
        <p class="text-sm text-gray-500 flex-1">Showind 1 to 5 of 100 entries</p>
        <div class="flex items-center max-md:mt-4">
          <p class="text-sm text-gray-500">Display</p>
          <select class="text-sm text-gray-500 border border-gray-400 rounded h-7 mx-4 px-1 outline-none">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>

          <ul class="flex space-x-1 ml-2">
            <li class="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </li>
            <li class="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
              1
            </li>
            <li class="flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded">
              2
            </li>
            <li class="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
              3
            </li>
            <li class="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
              4
            </li>
            <li class="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>

        </div>
  </div>
  )
}

export default Supervisors