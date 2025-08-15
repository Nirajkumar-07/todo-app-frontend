import handleErrors from "../actions/common.action";
import axiosInterceptor from "../api/axios-interceptor";

export async function getDashboardData() {
  try {
    const res = await axiosInterceptor.get("dashboard/data");
    return {
      success: true,
      data: res.data,
      message: "Successfull...",
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
