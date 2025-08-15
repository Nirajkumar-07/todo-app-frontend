import handleErrors from "../actions/common.action";
import axiosInterceptor from "../api/axios-interceptor";

export async function getUser() {
  try {
    const res = await axiosInterceptor.get("user");
    return {
      success: true,
      data: res.data,
      message: "successfull..",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
}

export async function changePassword(body) {
  try {
    const res = await axiosInterceptor.post(
      "user/change-password",
      JSON.stringify(body)
    );
    return {
      success: true,
      data: res.data,
      message: "successfull..",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
}
