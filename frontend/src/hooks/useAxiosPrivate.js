import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefresh";
import useAuth from "./useAuth";


const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {auth} = useAuth();

  useEffect(()=> {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}` 
        }
        return config
      }, (error) => Promise.reject(error)

    )

    const resIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent){
          prevRequest.sent = true
          const newAccessToken = await refresh();
          prevRequest.headers[`Authorization`] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept)
      axiosPrivate.interceptors.response.eject(resIntercept)
    }
  }, [auth, refresh])
  return axiosPrivate
}

export default useAxiosPrivate

