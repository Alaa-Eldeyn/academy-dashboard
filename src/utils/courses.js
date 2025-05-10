import Swal from "sweetalert2";
import customAxios from "./axios";
import { z } from "zod";
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subCategoryID: z.string().min(1, { message: "Sub Category is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  price: z.string().min(0, { message: "Price is required" }).default("0"),
  preview: z.string().min(1, { message: "Preview is required" }),
  thumbnail: z.any(),
});

const getAllCourses = async () => {
  try {
    let response = await customAxios.get("/Course/All");
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};
const getFilteredCourses = async (search) => {
  try {
    let response = await customAxios.get(
      `/Course/GetAllCoursesFilteredPaginated?status=1&title=${search}`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};
const searchCourses = async (title) => {
  try {
    let response = await customAxios.get(`/Course/Search/${title}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getPendingCourses = async () => {
  try {
    let response = await customAxios.get("/Dashboard/PendingApproval");
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getPendingDeleteCourses = async () => {
  try {
    let response = await customAxios.get("/Dashboard/PendingDeletion");
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getApprovedCourses = async () => {
  try {
    let response = await customAxios.get("/Dashboard/Approved");
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getOneCourse = async (id) => {
  try {
    let response = await customAxios.get(`/Course/${id}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const approveCourse = async (courseId) => {
  try {
    let response = await customAxios.post(
      `/Dashboard/ApproveAddingCourse/${courseId}`
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const rejectCourse = async (courseId) => {
  let reason = await Swal.fire({
    icon: "warning",
    title: "Reject Course!?",
    input: "textarea",
    inputPlaceholder: "Enter Rejection Reason...",
  });
  if (reason?.isConfirmed) {
    try {
      let response = await customAxios.post(
        `/Dashboard/RejectAddingCourse/${courseId}`,
        {
          params: reason?.value,
        }
      );
      return response?.data;
    } catch (error) {
      console.error(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const requestDelete = async (id) => {
  const customSwal = Swal.mixin({
    customClass: {
      confirmButton: "bg-red-500 text-white mr-5 py-3 px-8 rounded-full",
      cancelButton: "bg-[#FEF3FF] text-black  py-3 px-8 rounded-full",
      title: "text-red-500",
      icon: "!text-red-500 !border-red-500",
    },
    buttonsStyling: false,
  });
  const result = await customSwal.fire({
    icon: "warning",
    title: "Delete This Course ?",
    text: "Are You Sure that you want to delete this Course ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.post(
        `/Course/RequestDelete?courseId=${id}`
      );
      if (response.data.isSuccess) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const deleteCourse = async (courseId) => {
  const customSwal = Swal.mixin({
    customClass: {
      confirmButton: "bg-red-500 text-white mr-5 py-3 px-8 rounded-full",
      cancelButton: "bg-[#FEF3FF] text-black  py-3 px-8 rounded-full",
      title: "text-red-500",
      icon: "!text-red-500 !border-red-500",
    },
    buttonsStyling: false,
  });
  const result = await customSwal.fire({
    icon: "warning",
    title: "Delete This Course ?",
    text: "Are You Sure that you want to delete this Course ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.delete(`Dashboard/${courseId}`);
      if (response.data.isSuccess) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const addUserToCourse = async (courseId) => {
  const customSwal = Swal.mixin({
    customClass: {
      confirmButton: "bg-primary text-white mr-5 py-3 px-14 mb-3 rounded-full",
      cancelButton: "bg-[#FEF3FF] text-black  py-3 px-14 mb-3 rounded-full",
      title: "text-[#E2508D]",
      input: "w-[80%] mx-auto",
      popup: "rounded-2xl",
    },
    buttonsStyling: false,
  });
  const result = await customSwal.fire({
    padding: "1rem",
    title: "Add User Access",
    text: "Do you want to Open This course for the User ?",
    input: "email",
    inputPlaceholder: "Enter User Email here",
    showCancelButton: true,
    confirmButtonText: "Add Now",
  });
  if (result.isConfirmed) {
    try {
      let response = await customAxios.post(
        `/Course/Enroll?studentId=${result.value}&courseId=${courseId}`
      );
      if (response.data.isSuccess) {
        customSwal.fire({
          icon: "success",
          title: "Successful Process",
          text: "User Added Successfully",
          showConfirmButton: false,
          timer: 1000,
          confirmButtonText: "Got it",
        });
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

const getCourseQuestions = async (courseId) => {
  try {
    let response = await customAxios.get(`/Question/course/${courseId}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const getPendingEnrolls = async () => {
  try {
    let response = await customAxios.get(
      "Dashboard/GetPendingApprovalEnrollRequests"
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const approveEnroll = async (data) => {
  try {
    let response = await customAxios.post(
      `/Dashboard/ApprovePendingApprovalEnrollRequests`,
      {
        studentId: data.studentId,
        instructorId: data.instructorId,
        courseId: data.courseId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const rejectEnroll = async (data) => {
  try {
    let response = await customAxios.post(
      `/Dashboard/RejectPendingApprovalEnrollRequests`,
      {
        studentId: data.studentId,
        instructorId: data.instructorId,
        courseId: data.courseId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};
const addCourse = async (data) => {
  try {
    let response = await customAxios.post("/Course/AddCourse", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};
export {
  getAllCourses,
  getFilteredCourses,
  getOneCourse,
  getPendingCourses,
  approveCourse,
  rejectCourse,
  getApprovedCourses,
  deleteCourse,
  addUserToCourse,
  getPendingDeleteCourses,
  requestDelete,
  getCourseQuestions,
  getPendingEnrolls,
  approveEnroll,
  rejectEnroll,
  searchCourses,
  schema,
  addCourse,
};
