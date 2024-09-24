import { z } from "zod";
import customAxios from "./axios";
import Swal from "sweetalert2";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 character" })
    .max(255, { message: "Name is too long." }),
  description: z
    .string()
    .min(10, { message: "Description must contain at least 10 character" })
    .max(1000, { message: "Description is too long." }),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  subcategory: z.string().min(1, { message: "Please select a subcategory" }),
  downloadLink: z.string().url(),
  cover: z.any(),
});

const addBook = async (data) => {
  try {
    let response = await customAxios.post("Book", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getBook = async (id) => {
  try {
    let response = await customAxios.get(`Book/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getAllBooks = async () => {
  try {
    let response = await customAxios.get(`Book`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const deleteBook = async (id) => {
  Swal.fire({
    icon: "warning",
    title: "Delete This Book ?",
    text: "Are You Sure that you want to delete this Book ? ",
    showCancelButton: true,
    confirmButtonText: "Delete",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let response = await customAxios.delete(`Book/${id}`);
        if (response.data.isSuccess) {
          Swal.fire("Book Deleted Successfully", "", "success");
        }
      } catch (error) {
        console.log(error);
        return { isSuccess: false };
      }
    }
  });
};

const updateBook = async (id, data) => {
  try {
    let response = await customAxios.put(`Book/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export { schema, addBook, updateBook, getBook, getAllBooks, deleteBook };
