import axios from './axios';

export default function loginAPI({email, pwd}) {
    return axios.post(
      '/user/login',
      JSON.stringify({email, password: pwd}),
      {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      },
    );
}
