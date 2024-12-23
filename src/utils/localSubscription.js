import customAxios from "./axios";

const getPendingLocalEnrolls = async () => {
  try {
    let response = await customAxios.get(
      "/Dashboard/GetPendingApprovalLocalSubscriptions"
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
};

const approveLocalEnroll = async (id) => {
  console.log(id);

  try {
    let response = await customAxios.post(
      `/Dashboard/ApproveLocalSubscriptionRequest?localSubscriptionId=${id}`,
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

const rejectLocalEnroll = async (id) => {
  try {
    let response = await customAxios.post(
      `/Dashboard/RejectLocalSubscriptionRequest?localSubscriptionId=${id}`,
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

export { getPendingLocalEnrolls, approveLocalEnroll, rejectLocalEnroll };
