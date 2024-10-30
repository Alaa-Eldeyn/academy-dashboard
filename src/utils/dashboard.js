import customAxios from "./axios";

const getTotals = async () => {
  try {
    let response = await customAxios.get("/Dashboard/GetAllstatistics");
    return response.data;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

export { getTotals };
