import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import { axiosProvider } from "./AxsoisProvider";
import { getErrorStatus, getResponseError } from "./getResponse";
import useLogout from "./useLogout";


export type ResponseType = {
  data: any;
  error: any;
  loading: boolean;
  status: any;
};

const useAxios = () => { 
 
  const [response, setResponse] = useState<ResponseType>({
    data: null,
    error: null,
    loading: false,
    status: null,
  });

  const logout = useLogout();

  const sendRequest = async function (props: AxiosRequestConfig) {

    setResponse((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await axiosProvider.request(props);

      setResponse((prev) => ({
        ...prev,
        data: result.data,
        loading: false,
        status: result.status,
        error: null,
      }));
      return result.data;
    } catch (error) {
      if ([403, 401].includes(getErrorStatus(error))) {
        logout();
      }

      setResponse((prev) => ({
        ...prev,
        error: getResponseError(error),
        status: "",
        loading: false,
      }));
      return Promise.reject(getResponseError(error));
    }
  };
  return [response, sendRequest] as const;
};

export default useAxios;
