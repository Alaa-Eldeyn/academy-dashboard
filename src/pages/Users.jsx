import { MdDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import PaginatedItems from "../components/PaginatedItems";
import { FaUsers } from "react-icons/fa6";

function Users() {
  const items = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  return (
    <div className="flex flex-col  -ml-[1rem]  sm:ml-[12rem]    md:ml-[14rem]    lg:ml-[11rem]    lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 px-2 lg:px-8">
        <h1 className="flex font-bold text-2xl items-center gap-2 mt-4 lg:mt-0">
          <FaUsers  className="text-xl" />
          Users
        </h1>

        {/* Search and Add button */}
        <div className="my-6 flex flex-wrap flex-col sm:flex-row items-start sm:items-center justify-between gap-8 w-auto">
          <div className="bg-white  flex w-full max-w-full sm:max-w-md px-2 py-1 rounded-full border border-blue-500 overflow-hidden">
            <input
              type="text"
              placeholder="Search By Name, Email and Phone here"
              className="rounded-full w-full outline-none bg-white pl-4 text-sm"
            />
            <button type="button" className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5">
              Search
            </button>
          </div>
          <button className="bg-gray-200 p-3 flex items-center gap-2 rounded-xl w-full sm:w-auto">
            <IoAddCircleOutline />
            Add a Users
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded-lg">
            <thead className="bg-gray-400 whitespace-nowrap">
              <tr>
                <td className="p-3 w-8">
                  <label htmlFor="checkbox1" className="text-black text-sm"></label>
                  <input
                    id="checkbox1"
                    type="checkbox"
                    className="w-4 h-4 text-center focus:ring-1 focus:ring-offset-slate-200 focus:ring-offset-4 focus:ring-[#007bff]"
                  />
                </td>
                {["#ID", "Full Name", "Email", "Phone", "Action"].map((item, index) => (
                  <th key={index} className="text-center px-4 py-2">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-center whitespace-nowrap divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="pl-4 w-8">
                    <label htmlFor="checkbox1" className="text-black text-sm"></label>
                    <input
                      id="checkbox1"
                      type="checkbox"
                      className="w-4 h-4 mr-3 focus:ring-1 focus:ring-offset-slate-200 focus:ring-offset-4 focus:ring-[#007bff]"
                    />
                  </td>
                  <td className="pl-4 w-8">{item}</td>
                  <td className="p-4 text-sm">
                    <p className="text-sm text-black">Gladys Jones</p>
                  </td>
                  <td className="p-4 text-sm">hisham.mosa.910@gmail.com</td>
                  <td className="px-6 py-3">01024563699878</td>

                  <td className="py-3 flex items-center gap-2 justify-center">
                    <button className="bg-gray-200 p-1 rounded-md flex items-center gap-1">
                      <MdDelete className="text-lg" />
                      Delete
                    </button>
                    <button className="bg-gray-200 p-1 rounded-md flex items-center gap-1">
                      <IoEyeOutline className="text-lg" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination and Delete Button */}
          <div className="flex flex-wrap flex-col sm:flex-row items-center justify-between mt-4 w-full">
            <PaginatedItems items={items} itemsPerPage={4} />
            <button className="bg-slate-200 p-2 rounded-lg flex items-center gap-1 mt-4 sm:mt-0">
              <MdDelete className="text-lg" />
              Delete Selected Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
