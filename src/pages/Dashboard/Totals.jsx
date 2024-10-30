import { Icon } from "@iconify/react/dist/iconify.js";
import graph from "../../assets/Graph.svg";
import { useEffect, useState } from "react";
import { getTotals } from "../../utils/dashboard";

const Totals = () => {
  const [totals, setTotals] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTotals();
      setTotals(data);
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className=" bg-white rounded-lg flex justify-between shadow-sm gap-5 ">
        <div className="p-4">
          <Icon
            icon="solar:user-bold"
            className="bg-[#FDF1ED] text-[#CC775D] w-10 h-10 rounded-full p-2
          mb-2"
          />
          <p className="text-xl font-bold text-semiBlack mb-1 pl-1">
            {totals?.totalUsersCount}
          </p>
          <h2 className="pl-1 text-xs">Users</h2>
        </div>
        <div className="self-end">
          <img src={graph} alt="" />
        </div>
      </div>
      <div className=" bg-white rounded-lg flex justify-between shadow-sm gap-5 ">
        <div className="p-4">
          <Icon
            icon="clarity:video-gallery-solid"
            className="bg-[#F3FDF5] text-[#56C66F] w-10 h-10 rounded-full p-2
          mb-2"
          />
          <p className="text-xl font-bold text-semiBlack mb-1 pl-1">
            {totals?.totalCoursesCount}
          </p>
          <h2 className="pl-1 text-xs">Total Courses</h2>
        </div>
        <div className="self-end">
          <img src={graph} alt="" />
        </div>
      </div>
      <div className=" bg-white rounded-lg flex justify-between shadow-sm gap-5 ">
        <div className="p-4">
          <Icon
            icon="wpf:books"
            className="bg-[#FFFCF2] text-[#D7B94D] w-10 h-10 rounded-full p-2
          mb-2"
          />
          <p className="text-xl font-bold text-semiBlack mb-1 pl-1">
            {totals?.totalBooksCount}
          </p>
          <h2 className="pl-1 text-xs">Total Books</h2>
        </div>
        <div className="self-end">
          <img src={graph} alt="" />
        </div>
      </div>
      <div className=" bg-white rounded-lg flex justify-between shadow-sm gap-5 ">
        <div className="p-4">
          <Icon
            icon="carbon:blog"
            className="bg-[#F4F3FA] text-[#5F57C4] w-10 h-10 rounded-full p-2
          mb-2"
          />
          <p className="text-xl font-bold text-semiBlack mb-1 pl-1">
            {totals?.totalBlogsCount}
          </p>
          <h2 className="pl-1 text-xs">Total Blogs</h2>
        </div>
        <div className="self-end">
          <img src={graph} alt="" />
        </div>
      </div>
      <div className=" bg-white rounded-lg flex justify-between shadow-sm gap-5 ">
        <div className="p-4">
          <Icon
            icon="healthicons:i-exam-multiple-choice"
            className="bg-[#FFF3FD] text-[#B444A2] w-10 h-10 rounded-full p-2
          mb-2"
          />
          <p className="text-xl font-bold text-semiBlack mb-1 pl-1">
            {totals?.totalExamsCount}
          </p>
          <h2 className="pl-1 text-xs">Total Exams</h2>
        </div>
        <div className="self-end">
          <img src={graph} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Totals;
