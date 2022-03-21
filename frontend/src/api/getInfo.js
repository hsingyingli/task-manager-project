import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "./axios";
export default function getInfo() {
  return axios.get('/user/me');
}
