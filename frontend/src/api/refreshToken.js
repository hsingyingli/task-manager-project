import axios from "./axios";

const refreshTokenAPI = () => {
    return axios.get('/refresh', {
      withCredentials: true
    })
}

export default refreshTokenAPI
