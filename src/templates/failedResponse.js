export const failedResponse = (statusCode, message) => {
  return {
    status: statusCode,
    message: message,
    data: null,
  };
};
