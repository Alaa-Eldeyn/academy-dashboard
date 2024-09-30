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

const addCategory = async (categoryName) => {
  try {
    let response = await customAxios.post(
      "/Category",
      { name: `${categoryName}` },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const addSubCategory = async (data) => {
  try {
    let response = await customAxios.post(`/SubCategory`, data, {
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

const getSubs = async (categoryId) => {
  try {
    let response = await customAxios.get(`/SubCategory/Category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

const moveSubCategory = async (id, data) => {
  try {
    let response = await customAxios.put(`/SubCategory/${id}`, data, {
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

export {
  getAllCategories,
  getAllSubCategories,
  addCategory,
  addSubCategory,
  getSubs,
  moveSubCategory,
};
