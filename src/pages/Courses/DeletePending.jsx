import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCourse, getPendingDeleteCourses } from "../../utils/courses";
import Swal from "sweetalert2";

const DeletePending = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      let res = await getPendingDeleteCourses();
      setCourses(res?.data);
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    let res = await deleteCourse(id);
    if (res?.isSuccess) {
      await Swal.fire("Approved!", "The course has been approved.", "success");
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  return (
    <>
      <div className="px-6">
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses?.map((item) => (
            <div
              key={item?.id}
              className="rounded-3xl p-3 overflow-hidden shadow-md border"
            >
              <div className="relative w-full">
                <img
                  className="w-full rounded-2xl h-52 object-cover"
                  src={`${import.meta.env.VITE_BASE_URL}/${item?.thumbnailURL}`}
                  alt="Course image preview"
                />
                <div className="center gap-2 lg:gap-3 w-[90%] mx-auto rounded-full p-3 border-[5px] border-white -translate-y-8  bg-[#CC775D] text-white text-xs soft -mb-8">
                  <div className="center gap-1">
                    <Icon icon="mdi:category-plus" />
                    <span className="line-clamp-1">{item?.categoryName}</span>
                  </div>
                  <div className="center gap-1">
                    <Icon icon="mdi:category-plus" />
                    <span className="line-clamp-1">
                      {item?.subCategoryName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div className="flex justify-between items-center text-lg soft">
                  <h2 className="line-clamp-1">{item?.title}</h2>
                  <h3 className="font-bold text-[#E2508D]">{item?.price}$</h3>
                </div>
                <p className="text-gray-500 my-2 text-sm">
                  {item?.objectives?.map((obj) => {
                    return `${obj.description}${
                      item?.objectives?.indexOf(obj) ===
                      item?.objectives?.length - 1
                        ? "."
                        : ","
                    }`;
                  })}
                </p>
                <span className="text-xs">{item?.instructorFullName}</span>
                <Link
                  to={`/deletion-course-details/${item?.id}`}
                  className="center text-[#E2508D] border border-[#E2508D] p-3 w-full rounded-full mt-2"
                >
                  Show Content
                </Link>
                <button
                  onClick={() => handleDelete(item?.id)}
                  className="center text-white bg-primary p-3 w-full rounded-full mt-2"
                >
                  Delete Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeletePending;
