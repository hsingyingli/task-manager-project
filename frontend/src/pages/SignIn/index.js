import {useRef, useState, useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import loginAPI from '../../api/login';
import {Container, SignInForm, ErrorMsg, Box} from '../../styles/signin';
import Input_panel from '../../components/UI/input_panel';


export default function SignIn() {
  /*------ HOOKS -------*/
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  /*--------------------*/

  const from = location.state?.from.pathname || '/';
  const emailRef = useRef();
  const [errDisplay, setErrDisplay] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, []);


  const handleSumit = async (event) => {
    event.preventDefault();
    setErrDisplay(false);

    try {
      const res = await loginAPI({email, pwd});
      console.log(res.data)
      setAuth({user: res.data.user, accessToken: res.data.accessToken});
      localStorage.setItem('username', res.data.user.name)
      setEmail('');
      setPwd('');
      navigate(from, {replace: true});
    } catch (error) {
      setErrDisplay(true);
      setErrMsg('Wrong email or password');
    }
  };

  return (
    <Container>
      <h2>Sign In</h2>
      <ErrorMsg className="error-msg" _display={errDisplay}>
        {errMsg}
      </ErrorMsg>
      <SignInForm className="sign-in-form">
        <form onSubmit={handleSumit}>
          <Input_panel
            text="Email"
            htmlFor="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            ref={emailRef}
          />
          <Input_panel
            text="Password"
            htmlFor="password"
            type="password"
            value={pwd}
            onChange={(event) => setPwd(event.target.value)}
          />
          <button>Submit</button>
        </form>
        <Box>
          <p>Need an Account? <Link className='link-to-register'to='/register'>Sign Up</Link></p>
        </Box>
      </SignInForm>
    </Container>
  );
}
