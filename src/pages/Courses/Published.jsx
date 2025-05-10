import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getApprovedCourses,
  getFilteredCourses,
  requestDelete,
} from "../../utils/courses";
import { toast } from "react-toastify";

const Published = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCourses = async () => {
    let res = await getApprovedCourses();
    console.log(res);
    
    setCourses(res?.data);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  const requestDeleteCourse = async (id) => {
    let res = await requestDelete(id);
    if (res?.isSuccess) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };
  // const handleAddUser = async (id) => {
  //   let res = await addUserToCourse(id);
  //   console.log(res);
  // };
  const handleSearch = async (e) => {
    e.preventDefault();
    let res = await getFilteredCourses(search);
    console.log(res);
    
    if (res?.isSuccess) {
      setCourses(res?.data?.items || []);
    } else {
      toast.error(res?.message || "Something went wrong!");
      setSearch("");
      fetchCourses();
    }
  };
  return (
    <div className="px-6">
      <div className=" flex flex-wrap flex-col sm:flex-row items-center justify-between gap-8 w-auto mb-6">
        <form className="bg-white flex w-full sm:max-w-md p-1 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search By course Title here"
            className="rounded-full w-full outline-none bg-white border-none pl-4 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#FBE1EC] hover:bg-primary hover:text-white transition-all text-black text-sm rounded-full px-5 py-2.5"
            onClick={(e) => handleSearch(e)}
          >
            Search
          </button>
        </form>
        <Link
          to="/Courses/add-course"
          className="border border-pink-600 text-pink-600 text-sm px-4 py-3 flex items-center gap-2 rounded-xl w-full sm:w-auto"
        >
          <Icon icon="octicon:plus-circle-16" />
          Add a course
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded-lg">
          <thead className="bg-white  whitespace-nowrap">
            <tr>
              <td className="size-10 bg-gray-50"></td>

              {[
                "course title",
                "course creator",
                "Role",
                "Price ($)",
                "Subscribers",
                "Action",
              ].map((item, index) => (
                <th
                  key={index}
                  className="text-center px-4 py-2 text-secondary"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-center whitespace-nowrap divide-y bg-white divide-gray-200">
            {courses?.map((course, index) => (
              <tr key={index}>
                <td className="size-10 bg-gray-100">{index + 1}</td>
                <td className="p-4 text-sm">{course?.title}</td>
                <td className="px-6 py-3">{course?.instructorFullName}</td>
                <td className="px-6 py-3">User</td>
                <td className="px-6 py-3">{course?.price}</td>
                <td className="px-6 py-3">{24}</td>
                <td className="py-3 flex items-center gap-2 justify-center">
                  <button
                    onClick={() => requestDeleteCourse(course?.id)}
                    className="bg-[#FFF8F8] text-[#E23F3F] px-2 justify-center py-1 rounded-md flex items-center gap-1"
                  >
                    <Icon icon="fluent:delete-12-regular" />
                    Delete
                  </button>
                  <Link
                    to={`/published-course-details/${course?.id}`}
                    className="bg-[#FEF8FF] text-[#984D9F] px-2 justify-center py-1 rounded-md flex items-center gap-1"
                  >
                    <Icon icon="ph:eye" />
                    View
                  </Link>
                  {/* <button
                    onClick={() => handleAddUser(course?.id)}
                    className="bg-[#FEF8FF] text-[#E2508D] px-2 justify-center py-1 rounded-md flex items-center gap-1"
                  >
                    <Icon icon="mynaui:plus-square" />
                    add
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Published;
