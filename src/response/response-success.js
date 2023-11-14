export const successResponse = (status, message, data) => {
  return {
    status: status,
    message: message,
    data: data,
  };
};
