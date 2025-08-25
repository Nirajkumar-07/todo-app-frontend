import axios from "axios";
import handleErrors from "../actions/common.action";
import axiosInterceptor, { BASE_URL } from "../api/axios-interceptor";

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

export async function uploadImage(body) {
  try {
    const authToken = sessionStorage.getItem("auth_token");
    const res = await axios.post(BASE_URL + "api/user/upload/image", body, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    return {
      success: true,
      data: res.data.data,
      message: "successfull..",
    };
  } catch (error) {
    console.log("error =>", error);
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      data: null,
      message: errorMessage,
    };
  }
}
