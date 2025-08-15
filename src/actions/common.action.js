export default async function handleErrors(error) {
  let errorMessage = error.response?.data?.message || error.message;
  switch (error.status) {
    case 401:
      error = "unauthorized user";
      break;
    case 404:
      error = error.response.data.message;
      break;
    default:
      break;
  }
  return errorMessage;
}
