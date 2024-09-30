import { useState } from "react";
import Courses from "./Courses";
import Blogs from "./Blogs";
import Books from "./Books";
import Exams from "./Exams";

const Taps = () => {
  const [tap, setTap] = useState("Courses");
  return (
    <div className="sm:px-6">
      <div className="flex gap-3 flex-wrap">
        <div
          className={` flex-1 sm:flex-none text-center px-8 py-2 text-black bg-[#FFF2F7] rounded-lg cursor-pointer hover:bg-primary hover:text-white select-none soft ${
            tap === "Courses" && "!bg-primary !text-white"
          }`}
          onClick={() => setTap("Courses")}
        >
          Courses
        </div>
        <div
          className={` flex-1 sm:flex-none text-center px-8 py-2 text-black bg-[#FFF2F7] rounded-lg cursor-pointer hover:bg-primary hover:text-white select-none soft ${
            tap === "Blogs" && "!bg-primary !text-white"
          }`}
          onClick={() => setTap("Blogs")}
        >
          Blogs
        </div>
        <div
          className={` flex-1 sm:flex-none text-center px-8 py-2 text-black bg-[#FFF2F7] rounded-lg cursor-pointer hover:bg-primary hover:text-white select-none soft ${
            tap === "Books" && "!bg-primary !text-white"
          }`}
          onClick={() => setTap("Books")}
        >
          Books
        </div>
        <div
          className={` flex-1 sm:flex-none text-center px-8 py-2 text-black bg-[#FFF2F7] rounded-lg cursor-pointer hover:bg-primary hover:text-white select-none soft ${
            tap === "Exams" && "!bg-primary !text-white"
          }`}
          onClick={() => setTap("Exams")}
        >
          Exams
        </div>
      </div>
      <div className="mt-4">
        {tap === "Courses" && <Courses />}
        {tap === "Blogs" && <Blogs />}
        {tap === "Books" && <Books />}
        {tap === "Exams" && <Exams />}
      </div>
    </div>
  );
};

export default Taps;
