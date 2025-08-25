import axios from "axios";
import handleErrors from "../actions/common.action";
import { BASE_URL } from "../api/axios-interceptor";

export async function signin(body) {
  try {
    const res = await axios.post(
      BASE_URL + "api/auth/signin",
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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

export async function signup(body) {
  try {
    const res = await axios.post(
      BASE_URL + "api/auth/signup",
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
