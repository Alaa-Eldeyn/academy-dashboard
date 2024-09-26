import customAxios from "./axios";

const getAllCategories = async () => {
  try {
    let response = await customAxios.get(`Category/GetAllCategories`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const getAllSubCategories = async () => {
  try {
    let response = await customAxios.get(`SubCategory/GetAllSubCategories`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export { getAllCategories, getAllSubCategories };
