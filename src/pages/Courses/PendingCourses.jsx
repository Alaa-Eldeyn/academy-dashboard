import { PiVideoLight } from "react-icons/pi";
import { BsArrowDownRightCircleFill } from "react-icons/bs"; 

function PendingCourses() {
  const items = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  return (
    <div className="flex flex-col  -ml-[1rem]  sm:ml-[12rem]    md:ml-[14rem]    lg:ml-[11rem]    lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 px-2 lg:px-16">
        <h1 className="flex  font-normal text-xl items-center gap-2 mt-2 lg:mt-0">
          <PiVideoLight  className="text-xl" />
            Courses /  Pending Courses 
        </h1>
         {/* courses */}
         <div className="max-w-screen-xl flex flex-wrap mx-auto mt-6">
          <div className="grid grid-cols-1  sm:grid-cols-1   md:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3   gap-6">
              {["A", "v", "f","A", "v", "f", "A", "v", "f"].map((item, index) => (
                  <div key={index} className="rounded-3xl p-3 overflow-hidden shadow-lg">
                      <div className="relative">
                          <img
                              className="w-full rounded-b-[50px] rounded-t-[30px]"
                              src="https://instructor-academy.onlinecoursehost.com/content/images/2023/05/101_-What-Online-Courses-Are-Most-In-Demand-In-2023_.jpg"
                              alt="Sunset in the mountains"
                          />
                          <div className="flex w-full justify-between items-center rounded-[35px] p-3 border-[8px] border-white absolute bottom-0 left-0 bg-indigo-600 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                              <span><BsArrowDownRightCircleFill /></span>
                              <p>Cardiology</p>
                              <span><BsArrowDownRightCircleFill /></span>
                              <p>Intermediate</p>
                              <span><BsArrowDownRightCircleFill /></span>
                              <p>4.7</p>
                          </div>
                      </div>
                      <div className="px-6 py-4">
                          <div className="flex justify-between font-semibold text-lg hover:text-indigo-600 transition duration-500 ease-in-out">
                              <h2>Advanced Cardiology</h2>
                              <h3>20$</h3>
                          </div>
                          <p className="text-gray-500 my-2 text-sm">
                              Deepen your understanding of advanced cardiovascular treatments and diagnostic techniques.
                          </p>
                          <span className="text-sm">Dr. Ahmed El-Sharif</span>
                      </div>
                      <div className="px-6 py-2 flex flex-row items-center">
                          <button className="bg-gray-500 text-white p-2 w-full rounded-3xl">  Show Content</button>
                      </div>
                      <div className="px-6 gap-3 py-2 flex flex-row items-center">
                          <button className="border-2 border-black p-2 w-full rounded-3xl">Approve</button>
                          <button className="border-2 border-black p-2 w-full rounded-3xl">Reject </button>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      {/* courses */}
      </div>
    </div>
  );
}

export default PendingCourses;
