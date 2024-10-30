import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { approveCourse, getOneCourse, rejectCourse } from "../../utils/courses";
import { Icon } from "@iconify/react/dist/iconify.js";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourse = async () => {
      let course = await getOneCourse(id);
      setCourse(course?.data);
    };
    fetchCourse();
  }, [id]);
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
    <div className="px-6">
      <div className="flex gap-5">
        <div>
          <img
            src="https://via.placeholder.com/120"
            alt="book cover"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-3">
          <h1 className="font-bold text-2xl">{course?.title}</h1>
          <div className="flex gap-2">
            <div className="py-2 px-4 bg-[#FFF2F7] rounded-full text-xs">
              {course?.categoryName}
            </div>
            <div className="py-2 px-4 bg-[#FFF2F7] rounded-full text-xs">
              {course?.subCategoryName}
            </div>
          </div>
          <div className="flex gap-2">
            <img
              src="https://via.placeholder.com/20"
              alt=""
              className="rounded-full"
            />
            <span>Alaa Eldeyn</span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl mt-8">Course Details</h2>
        <ul className=" list-disc pl-5 pt-3">
          <li>Course pricing : {course?.price}$</li>
          <li>Course duration : {course?.durationInhours} hours</li>
        </ul>
        <h2 className="font-bold text-xl mt-8">Course Objectives</h2>
        <ul className=" list-disc pl-5 pt-3">
          {course?.objectives?.map((obj) => (
            <li key={obj.id}>{obj.description}</li>
          ))}
        </ul>
        <h2 className="font-bold text-xl mt-8">Course Requirements</h2>
        <ul className=" list-disc pl-5 pt-3">
          {course?.requirements?.map((req) => (
            <li key={req.id}>{req.description}</li>
          ))}
        </ul>
        <h2 className="font-bold text-xl mt-8">Course Videos</h2>
        <ul className="pt-3">
          {course?.videos?.map((vid) => (
            <li key={vid.id}>
              <a
                href={vid.videoURL}
                className="center gap-5 max-w-[50%] bg-white shadow-sm px-4 py-2 rounded-lg !justify-start"
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
        {/* todo - exams */}
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
      </div>
    </div>
  );
};

export default Details;
