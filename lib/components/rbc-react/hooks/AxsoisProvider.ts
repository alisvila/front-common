import axios from "axios";

export const apiAddressCreator = (url: string): string => {
  return "http://sta-test.rayanbourse.ir/" + url;
};

const axiosProvider = axios.create({
  // withCredentials: true,
  baseURL: "http://sta-test.rayanbourse.ir/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosProvider.interceptors.request.use(async (request: any) => {
  // request.headers["x-apikey"] = [process.env.apiKey];
  request.headers["Access-Control-Allow-Origin"] = ["*"];

  const token = "";
  // const token = await tokenManager();
  if (token) {
    request.headers["Authorization"] = [`Bearer ${token}`];
  }
  return request;
});

axiosProvider.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.request.status == 200) {
      // toast.error(getResponseError(error));
    }
    return Promise.reject(error);
  }
);

// axiosProvider.interceptors.response.use(
//   (response) => response,
//   (err) => {
//     //TODO  implement logout user when his request has 401 or 403 error code in useAxios
//     // if (err?.response?.status === 401) {
//     //     localStorage.clear()
//     //     window.location.href = window.location.origin + '/login'
//     // }

//     return Promise.reject(err);
//   }
// );

export { axiosProvider };



// import axios from "axios";
// import { getResponseError } from "@/request/utils/getResponse";
// import getTokenSSR from "@/utils/auth/getTokenSSR";
// import { API_URL } from "@/middleware/env-vars.helper";
// import { lockManager } from "./utils/tokenHelper";
// import { refreshToken } from "@/components/services/auth";

// // It need the word 'api' to be written at the end of the url
// // const tokenManager = lockManager();

// export const apiAddressCreator = (url: string): string => {
//   return API_URL + url;
// };

// const axiosProvider = axios.create({
//   // withCredentials: true,
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// axiosProvider.interceptors.request.use(async (request: any) => {
//   // request.headers["x-apikey"] = [process.env.apiKey];
//   request.headers["Access-Control-Allow-Origin"] = ["*"];

//   const token = getTokenSSR();
//   if (token) {
//     const tokenParsed =
//         token?.accessToken &&
//         JSON.parse(
//             Buffer.from(token.accessToken.split(".")[1], "base64").toString()
//         );

//     if (Date.now() < tokenParsed.exp * 1000 - 3000) {
//       request.headers["Authorization"] = [`Bearer ${token?.accessToken}`];
//     }
//     else {
//       const refreshedToken = await refreshToken({accessToken: token.accessToken, refreshToken: token.refreshToken});
//       request.headers["Authorization"] = [`Bearer ${refreshedToken?.accessToken}`];
//     }
//   }
//   return request;
// });

// axiosProvider.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.request.status == 200) {
//     }
//     return Promise.reject(error);
//   }
// );

// export { axiosProvider };
