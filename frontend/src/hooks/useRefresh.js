import useAuth from "./useAuth";
import refreshTokenAPI from "../api/refreshToken";


const useRefreshToken = () => {
  const {setAuth} = useAuth();

  const refresh = async () => {
    const res = await refreshTokenAPI()
    setAuth((prev) => {
      return {...prev, user: res.data.uesr, accessToken: res.data.accessToken}})

    localStorage.setItem('user', res.data.user.name)
    return res.data.accessToken
  }
  return refresh
}

export default useRefreshToken
