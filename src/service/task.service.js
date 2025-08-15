import handleErrors from "../actions/common.action";
import axiosInterceptor from "../api/axios-interceptor";

export async function getTaskList() {
  try {
    const res = await axiosInterceptor.get("task/list");
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

export async function getTask(taskId) {
  try {
    const res = await axiosInterceptor.get(`task/detail/${taskId}`);
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

export async function getTodayTasks() {
  try {
    const res = await axiosInterceptor.get("task/today-tasks");
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

export async function addTask(body) {
  try {
    const res = await axiosInterceptor.post("task/add", JSON.stringify(body));
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

export async function updateTask(taskId, body) {
  try {
    const res = await axiosInterceptor.post(
      `task/update/${taskId}`,
      JSON.stringify(body)
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

export async function deleteTask(taskId) {
  try {
    const res = await axiosInterceptor.delete(`task/delete/${taskId}`);
    return {
      success: true,
      //   data: res.data,
      message: "Successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      //   data: null,
      message: errorMessage,
    };
  }
}

export async function updateTaskStatus(taskId, status) {
  const body = { status };
  try {
    const res = await axiosInterceptor.post(
      `task/update-status/${taskId}`,
      JSON.stringify(body)
    );
    return {
      success: true,
      //   data: res.data,
      message: "Successfull...",
    };
  } catch (error) {
    const errorMessage = await handleErrors(error);
    return {
      success: false,
      //   data: null,
      message: errorMessage,
    };
  }
}
