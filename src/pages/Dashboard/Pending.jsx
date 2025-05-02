import { useEffect, useState } from "react";
import {
  approveCourse,
  getPendingCourses,
  rejectCourse,
} from "../../utils/courses";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const Pending = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      let res = await getPendingCourses();
      setCourses(res?.data);
    };
    fetchCourses();
  }, []);

  const handleApprove = async (id) => {
    let res = await approveCourse(id);
    if (res?.isSuccess) {
      await Swal.fire("Approved!", "The course has been approved.", "success");
      setCourses(courses.filter((course) => course.id !== id));
    }
  };
  const handleReject = async (id) => {
    let res = await rejectCourse(id);
    if (res?.isSuccess) {
      await Swal.fire("Rejected!", "The course has been Rejected.", "success");
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow h-[400px] overflow-auto pink-sc">
      <div className="flex justify-between items-center gap-5">
        <h1 className="text-xl font-bold text-primary">Pending Courses</h1>
        <button className="group flex items-center gap-1 text-[#E2508D]">
          Go to all Pending Courses
          <Icon icon="ep:right" className="group-hover:translate-x-2 soft" />
        </button>
      </div>
      <div className="mt-3 space-y-3">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="space-y-4 border border-[#CC775D] rounded-xl p-5 text-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={course.thumbnailURL}
                alt=""
                className="size-[50px] object-cover rounded-full"
              />
              <div>
                <h1 className="text-lg font-semibold">{course.title}</h1>
                <div className="flex gap-2 items-center text-[10px]">
                  <div className="bg-[#FFF2F7] rounded-lg px-3 py-[2px]">
                    {course.categoryName}
                  </div>
                  <div className="bg-[#FFF2F7] rounded-lg px-3 py-[2px]">
                    {course.subCategoryName}
                  </div>
                </div>
              </div>
            </div>
            <p className="line-clamp-2">
              This comprehensive course equips you with the skills to build both
              front-end and back-end web applications..
            </p>
            <div className="flex justify-between items-center gap-3">
              <Link to={`course-details/${course.id}`} className="center gap-1 border border-[#CC775D] text-[#CC775D] px-3 py-1 rounded-lg">
                <Icon icon="akar-icons:eye" />
                View Course Details
              </Link>

              <div className="center gap-3">
                <button
                  onClick={() => handleApprove(course.id)}
                  className="bg-primary text-white px-3 py-1 rounded-lg"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(course.id)}
                  className="bg-white text-red-500 border border-red-500 px-3 py-1 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pending;
