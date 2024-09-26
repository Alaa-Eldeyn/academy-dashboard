import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import PaginatedItems from "../../components/PaginatedItems";
import { useEffect, useState } from "react";
import { deleteBlog, getAllBlogs } from "../../utils/blogs";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchAllBlogs = async () => {
      let res = await getAllBlogs();
      setBlogs(res.data);
    };
    fetchAllBlogs();
  }, []);
    const handleDeleteBlog = async (id) => {
      const res = await deleteBlog(id);
      if (res?.isSuccess) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      }
    };
  return (
    <div className="px-6">
      <div className=" flex flex-wrap flex-col sm:flex-row items-center justify-between gap-8 w-auto mb-6">
        <div className="bg-white flex w-full sm:max-w-md p-1 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search By Blog Title here"
            className="rounded-full w-full outline-none bg-white border-none pl-4 text-sm"
          />
          <button
            type="button"
            className="bg-[#FBE1EC] hover:bg-primary hover:text-white transition-all text-black text-sm rounded-full px-5 py-2.5"
          >
            Search
          </button>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Link
            to="/Blogs/add-blog"
            className="border border-pink-600 text-pink-600 text-sm px-4 py-3 flex items-center gap-2 rounded-xl w-full sm:w-auto"
          >
            <Icon icon="octicon:plus-circle-16" />
            Add a Blog
          </Link>
          <Icon icon="ion:filter" className="text-3xl text-secondary" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded-lg">
          <thead className="bg-white  whitespace-nowrap">
            <tr>
              <td className="px-4 py-3 w-8">
                <label
                  htmlFor="checkbox1"
                  className="text-black text-sm"
                ></label>
                <input
                  id="checkbox1"
                  type="checkbox"
                  className="w-4 h-4 text-center focus:ring-1 focus:ring-offset-purple-200 focus:ring-offset-4 focus:ring-[#007bff]"
                />
              </td>
              {["Blog Cover", "Blog Title", "Publisher", "Date", "Action"].map(
                (item, index) => (
                  <th
                    key={index}
                    className="text-center px-4 py-2 text-secondary"
                  >
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="text-center whitespace-nowrap divide-y bg-white divide-gray-200">
            {blogs.map((blog, index) => (
              <tr key={index}>
                <td className="pl-4 w-8">
                  <label
                    htmlFor="checkbox1"
                    className="text-black text-sm"
                  ></label>
                  <input
                    id="checkbox1"
                    type="checkbox"
                    className="w-4 h-4 mr-3 focus:ring-1 focus:ring-offset-slate-200 focus:ring-offset-4 focus:ring-[#007bff]"
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:5000${blog?.imageURL}`}
                    alt=""
                    className="w-8 h-8 rounded-lg mx-auto"
                  />
                </td>
                <td className="p-4 text-sm">{blog?.title}</td>
                <td className="px-6 py-3">Hisham Mousa</td>
                <td className="px-6 py-3">21 Sep 2024</td>
                <td className="py-3 flex items-center gap-2 justify-center">
                  <button
                    onClick={() => handleDeleteBlog(blog?.id)}
                    className="bg-[#FFF8F8] text-[#E23F3F] px-2 justify-center py-1 rounded-md flex items-center gap-1"
                  >
                    <Icon icon="fluent:delete-12-regular" />
                    Delete
                  </button>
                  <Link
                    to={`/blogs/blog/${blog?.id}`}
                    className="bg-[#FEF8FF] text-[#984D9F] px-2 justify-center py-1 rounded-md flex items-center gap-1"
                  >
                    <Icon icon="ph:eye" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination and Delete Button */}
        <div className="flex flex-wrap flex-col sm:flex-row items-center justify-between mt-4 w-full">
          <PaginatedItems items={blogs} itemsPerPage={1} />
          <button className="border border-secondary text-secondary p-2 rounded-lg flex items-center gap-1 mt-4 sm:mt-0">
            <Icon icon="fluent:delete-12-regular" />
            Delete Selected Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
