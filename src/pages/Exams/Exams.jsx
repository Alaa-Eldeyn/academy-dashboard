import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllExams } from "../../utils/Exams";
import { deleteExam } from "../../utils/Exams";

const Exams = () => {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      let res = await getAllExams();
      if (res?.isSuccess) {
        setExams(res?.data);
      } else {
        setExams([]);
      }
    };
    fetchCourses();
  }, []);
  const handleDeleteExam = async (id) => {
    let res = await deleteExam(id);
    if (res?.isSuccess) {
      setExams(exams.filter((exam) => exam.id !== id));
    }
  };
  // const handleAddUser = async (id) => {
  //   let res = await addUserToExam(id);
  //   console.log(res);
  // };
  return (
    <div className="px-6">
      <div className=" flex flex-wrap flex-col sm:flex-row items-center justify-between gap-8 w-auto mb-6">
        <div className="bg-white flex w-full sm:max-w-md p-1 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search By exam name here"
            className="rounded-full w-full outline-none bg-white border-none pl-4 text-sm"
          />
          <button
            type="button"
            className="bg-[#FBE1EC] hover:bg-primary hover:text-white transition-all text-black text-sm rounded-full px-5 py-2.5"
          >
            Search
          </button>
        </div>
        <Link
          to="/exams/add-exam"
          className="border border-pink-600 text-pink-600 text-sm px-4 py-3 flex items-center gap-2 rounded-xl w-full sm:w-auto"
        >
          <Icon icon="octicon:plus-circle-16" />
          Add a exam
        </Link>
      </div>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1,1,1,1,1]?.map((item) => (
          <div
            key={item?.id}
            className="rounded-3xl p-3 overflow-hidden shadow-md border"
          >
            <div className="p-2">
              <h2 className="line-clamp-1 font-bold text-xl mb-3">
                {item?.title}
              </h2>
              <div className="text-gray-500 mb-5 text-sm space-y-3">
                <div className=" flex items-center gap-2">
                  <Icon
                    icon="iconamoon:star-bold"
                    className="text-[#E2508D] text-lg"
                  />{" "}
                  Full Mark: {item?.fullmark}
                </div>
                <div className=" flex items-center gap-2">
                  <Icon
                    icon="mingcute:time-line"
                    className="text-[#E2508D] text-lg"
                  />{" "}
                  Duration (Minutes): {item?.durationInMinutes}
                </div>
                <div className=" flex items-center gap-2">
                  <Icon
                    icon="material-symbols:merge-type"
                    className="text-[#E2508D] text-lg"
                  />{" "}
                  Type: {item?.typeName}
                </div>
                <div className=" flex items-center gap-2">
                  <Icon
                    icon="icon-park-twotone:muscle"
                    className="text-[#E2508D] text-lg"
                  />{" "}
                  Difficulty: {item?.difficultyName}
                </div>
                <div className=" flex items-center gap-2">
                  <Icon
                    icon="mdi:category-plus-outline"
                    className="text-[#E2508D] text-lg"
                  />{" "}
                  Category: {item?.categoryName}
                </div>
                <div className=" flex items-center gap-2">
                  <Icon
                    icon="mdi:category-plus-outline"
                    className="text-[#E2508D] text-lg"
                  />{" "}
                  Sub Category: {item?.subCategoryName}
                </div>
              </div>
              <span className="text-xs">{item?.instructorFullName}</span>
              <div className="gap-3 mt-2 flex flex-row items-center">
                <Link
                  to={`/exams/update-exam/${item?.id}`}
                  className=" text-primary border border-primary p-3 w-full rounded-xl center gap-2"
                >
                  <Icon icon="icon-park-outline:edit-two" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteExam(item?.id)}
                  className=" text-[#FF2929] border border-[#FF2929] p-3 w-full rounded-xl center gap-2"
                >
                  <Icon icon="fluent:delete-32-regular" />
                  Delete
                </button>
              </div>
              {/* <button
                onClick={() => handleAddUser(item?.id)}
                className="center text-[#E2508D] border border-[#E2508D] p-3 w-full rounded-xl mt-2"
              >
                Add user access
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
