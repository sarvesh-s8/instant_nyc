const errorFunction = (err) => {
  let errorMessage = "";
  if (err.response) {
    errorMessage = err.response.data.message;
    console.log(errorMessage);
  } else if (err.request) {
    errorMessage = err.request;
    console.log(errorMessage);
  } else {
    errorMessage = err.message;
    console.log(errorMessage);
  }
  return errorMessage;
};

export default errorFunction;
