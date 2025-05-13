import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  approveCourse,
  getCourseQuestions,
  getOneCourse,
  rejectCourse,
} from "../../utils/courses";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";

const Details = ({ isPublished }) => {
  const params = useParams();
  const [course, setCourse] = useState({});
  const [exam, setExam] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourse = async () => {
      let course = await getOneCourse(params?.id);
      setCourse(course?.data);
      let myExam = await getCourseQuestions(params?.id);
      setExam(myExam?.data);
    };
    fetchCourse();
  }, [params?.id]);
  const makeApproved = async (id) => {
    let res = await approveCourse(id);
    if (res?.isSuccess) {
      const customSwal = Swal.mixin({
        customClass: {
          confirmButton: "bg-primary text-white mb-5 py-3 px-8 rounded-full",
          title: "text-[#E2508D]",
          popup: "rounded-2xl",
        },
        buttonsStyling: false,
      });
      customSwal.fire({
        icon: "success",
        title: "Course approved",
        text: "You have successfully approved this course. The course will now be published on the site and available for users to access. Thank you for reviewing the content.",
        confirmButtonText: "Got it",
        width: "600px",
      });
      navigate("/pending-courses");
    }
  };
  const makeRejected = async (id) => {
    let res = await rejectCourse(id);
    if (res?.isSuccess) {
      const customSwal = Swal.mixin({
        customClass: {
          confirmButton: "main-btn mx-4",
          cancelButton: "second-btn",
          title: "text-[#E2508D]",
          popup: "rounded-2xl",
        },
        buttonsStyling: false,
      });
      const result = await customSwal.fire({
        icon: "error",
        title: "Course Rejected",
        text: "You have rejected this course. Please provide a reason for the rejection, which will be sent as a notification to the course creator.",
        confirmButtonText: "Send the reason",
        showCancelButton: true,
        width: "600px",
        input: "textarea",
        inputPlaceholder: "Write the reason for rejection here",
      });
      if (result.isConfirmed) {
        navigate("/pending-courses");
      }
    }
  };

  return (
    <div className="px-6 max-w-[1000px]">
      <div className="flex gap-5">
        <div>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${course?.thumbnailURL}`}
            alt="book cover"
            className="rounded-xl w-40"
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">{course?.title}</h1>
          <div className="flex gap-2">
            <div className="py-1 px-4 bg-[#FFF2F7] rounded-full text-xs">
              {course?.categoryName}
            </div>
            <div className="py-1 px-4 bg-[#FFF2F7] rounded-full text-xs">
              {course?.subCategoryName}
            </div>
          </div>
          <div className="flex gap-2 items-center !mt-4">
            <span>{course?.instructorFullName}</span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl mt-8">Course Details</h2>
        <ul className=" list-disc pl-5 pt-3">
          <li>Course pricing : {course?.price}$</li>
          <li>Course duration : {course?.durationInhours} hours</li>
        </ul>
        {course?.objectives?.length > 0 && (
          <>
            <h2 className="font-bold text-xl mt-8">Course Objectives</h2>
            <ul className=" list-disc pl-5 pt-3">
              {course?.objectives?.map((obj) => (
                <li key={obj.id}>{obj.description}</li>
              ))}
            </ul>
          </>
        )}
        {course?.requirements?.length > 0 && (
          <>
            <h2 className="font-bold text-xl mt-8">Course Requirements</h2>
            <ul className=" list-disc pl-5 pt-3">
              {course?.requirements?.map((req) => (
                <li key={req.id}>{req.description}</li>
              ))}
            </ul>
          </>
        )}
        {course?.videos?.length > 0 && (
          <>
            <h2 className="font-bold text-xl mt-8">Course Content</h2>
            <ul className=" list-disc pl-5 pt-3 space-y-2">
              {course?.videos?.map((vid) => (
                <li key={vid.id}>
                  <span className="font-semibold">{vid.title}</span>
                  {vid?.description && (
                    <>
                      <br />
                      <span className="pl-4"> {vid.description}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <h2 className="font-bold text-xl mt-8">Course Videos</h2>
            <ul className="pt-3 space-y-2">
              {course?.videos?.map((vid) => (
                <li key={vid.id}>
                  <a
                    href={`${import.meta.env.VITE_BASE_URL}/${vid.videoURL}`}
                    className="center gap-5 max-w-[50%] bg-white shadow hover:bg-[#FFF2F7] soft px-4 py-2 rounded-lg !justify-start"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon
                      icon="ph:video-light"
                      className="text-primary inline-block"
                    />
                    Lesson {vid.number} : {vid.title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        {exam?.length > 0 && (
          <>
            <h2 className="font-bold text-xl mt-8">Course Exam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {exam?.map((question) => {
                return (
                  <div key={question.id}>
                    <label
                      className="text-primary mb-1 block text-sm"
                      htmlFor="question"
                    >
                      Question
                    </label>
                    <div className="input bg-gray-100 border-none">
                      {question.description}
                    </div>
                    <p className="mt-3 mb-2 text-primary text-sm">
                      Available Options
                    </p>
                    {question?.answers.map((key, index) => (
                      <div key={key.id} className="flex gap-4 space-y-2">
                        <div className="pt-5 pl-2">
                          {index + 1 == 1 && "A"}
                          {index + 1 == 2 && "B"}
                          {index + 1 == 3 && "C"}
                          {index + 1 == 4 && "D"}
                        </div>
                        <div className="w-full">
                          <div className="input bg-gray-100 border-none">
                            {key.description}
                          </div>
                        </div>
                      </div>
                    ))}
                    <p className="mt-3 mb-2 text-primary text-sm">
                      Correct Answer
                    </p>
                    <div className="flex gap-5 select-none">
                      {question?.answers.map((key, index) => (
                        <label
                          key={key.id}
                          className={`${key.isCorrect && "text-primary"}`}
                        >
                          <input
                            type="radio"
                            value={
                              index + 1 == 1
                                ? "A"
                                : index + 1 == 2
                                  ? "B"
                                  : index + 1 == 3
                                    ? "C"
                                    : "D"
                            }
                            defaultChecked={key.isCorrect}
                          />{" "}
                          {index + 1 == 1
                            ? "A"
                            : index + 1 == 2
                              ? "B"
                              : index + 1 == 3
                                ? "C"
                                : "D"}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {!isPublished && (
          <>
            <div className="center gap-5 mt-5">
              <button
                onClick={() => makeApproved(course?.id)}
                className="main-btn !px-20"
              >
                Approve
              </button>
              <button
                onClick={() => makeRejected(course?.id)}
                className="second-btn !px-20"
              >
                Reject
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
