export const getResponseData = (response: any) => {
  return response.data?.data;
};

export const getResponseSuccess = (response: any) => {
  return response.data ? response.data.message : "عملیات با موفقیت انجام شد";
};

export const getResponseError = (error: any) => {
  
  return (
    error.response?.data.title ||
    error.response?.data.error ||
    error.response?.data.message ||
    "خطا در برقراری ارتباط با سرور"
  );
};

export const getErrorStatus = (error: any) => {
  return error.response ? error.response.status : "خطای نامشخص";
};
