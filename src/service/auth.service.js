import axios from "axios";
import handleErrors from "../actions/common.action";

export async function signin(body) {
  try {
    const res = await axios.post(
      "https://todo-app-backend-rust-one.vercel.app/api/auth/signin",
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
      "https://todo-app-backend-rust-one.vercel.app/api/auth/signup",
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
