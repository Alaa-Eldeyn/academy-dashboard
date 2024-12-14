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

const approveLocalEnroll = async (data) => {
  try {
    let response = await customAxios.post(
      `/Dashboard/ApproveLocalSubscriptionRequest`,
      {
        localSubscriptionId: data.userId,
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

const rejectLocalEnroll = async (data) => {
  try {
    let response = await customAxios.post(
      `/Dashboard/RejectLocalSubscriptionRequest`,
      {
        localSubscriptionId: data.userId,
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

export { getPendingLocalEnrolls, approveLocalEnroll, rejectLocalEnroll };
