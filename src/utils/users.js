import Swal from "sweetalert2";
import customAxios from "./axios";
import { z } from "zod";

const schema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters")
      .regex(/[a-z]/, "Password must have at least one lowercase letter")
      .regex(/[A-Z]/, "Password must have at least one uppercase letter")
      .regex(
        /\W/,
        "Password must have at least one non-alphanumeric character"
      ),
    confirmPassword: z.string().min(5, "Confirm password is required"),
    email: z.string().email({ message: "Invalid Email" }),
    phoneNumber: z
      .string()
      .min(5, { message: "Please enter a valid phone number" })
      .regex(
        /^\+\d{1,3}\d{4,14}$/,
        "Phone Number Format: +[country code][number] (e.g., +1234567890)"
      ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["confirmPassword"],
      });
    }
  });

const addUser = async (data) => {
  try {
    let response = await customAxios.post(`User/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getAllUsers = async (page) => {
  try {
    let response = await customAxios.get(
      `Dashboard/GetAllUsersPaginated?page=${page}&pageSize=10`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const deleteUser = async (userId) => {
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
    title: "Delete This User?",
    text: "Are You Sure that you want to delete this User?",
    showCancelButton: true,
    confirmButtonText: "Delete",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    try {
      let response = await customAxios.delete(`Dashboard/DeleteUser/${userId}`);
      if (response.data.isSuccess) {
        await Swal.fire({
          icon: "success",
          title: "User Deleted Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return { isSuccess: false };
    }
  }
  return { isSuccess: false };
};

export { getAllUsers, deleteUser, schema, addUser };
