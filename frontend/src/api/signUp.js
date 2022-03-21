import axios from './axios';

export default function signUpAPI({user, email, pwd}) {
    return axios.post(
      '/user/',
      JSON.stringify({name: user, email, password: pwd}),
      {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      },
    );
}

