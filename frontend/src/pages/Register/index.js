import {useRef, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, ErrorMsg, RegisterForm} from '../../styles/register';
import Input_panel from '../../components/UI/input_panel';
import signUpAPI from '../../api/signUp';
import useAuth from '../../hooks/useAuth';

const UserRegex = new RegExp('[A-Za-z].{6}');
const PwdRegex = new RegExp('[A-Za-z0-9].{8}');
const EmailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
export default function Register() {
  {/*------ HOOKS -------*/}
  const userRef = useRef();
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  {/*------ HOOKS -------*/}

  const [errDisplay, setErrDisplay] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [user, setUser] = useState('');
  const [userValid, setUserValid] = useState(false);

  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const [pwd, setPwd] = useState('');
  const [pwdValid, setPwdValid] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState('');
  const [isMatch, setMatch] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setUserValid(UserRegex.test(user));
  }, [user]);
  useEffect(() => {
    setEmailValid(EmailRegex.test(email))
  }, [email]);
  useEffect(() => {
    setPwdValid(PwdRegex.test(pwd));
  }, [pwd]);
  
  useEffect(()=>{
    setMatch(() => {
      if (confirmPwd != pwd) {
        return false;
      }
      return true;
    });
  }, [pwd, confirmPwd])


  const handleSumit = async (event) => {
    event.preventDefault();
    
    try {
      const res = await signUpAPI({user, email, pwd})
      setAuth({user: res.data.user, accessToken: res.data.accessToken});
      navigate('/', {replace: true});
    } catch (error) {
      console.log(error)
      setErrDisplay(true)
      setErrMsg('Email or Password is already taken!')
    }

  }

  return (
    <Container>
      <h2>Register</h2>
      <ErrorMsg _display={errDisplay}>{errMsg}</ErrorMsg>
      <RegisterForm isValid={isMatch && userValid && emailValid && pwdValid}>
        <form onSubmit={handleSumit}>
          <Input_panel
            text="User name"
            htmlFor="user"
            type="text"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            ref={userRef}
            showError={user && !userValid}
            errorText="Username must be at least 6 charactors"
          />
          <Input_panel
            text="Email"
            htmlFor="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            showError={email && !emailValid}
            errorText="InVaild Email"
          />
          <Input_panel
            text="Password"
            htmlFor="password"
            type="password"
            value={pwd}
            onChange={(event) => setPwd(event.target.value)}
            showError={pwd && !pwdValid}
            errorText="Password must be at least 8 charactors"
          />
          <Input_panel
            text="Confirm Password"
            htmlFor="confirm_password"
            type="password"
            value={confirmPwd}
            onChange={(event) => setConfirmPwd(event.target.value)}
            showError={confirmPwd && !isMatch}
            errorText="confirm password not match"
          />
          <button>Submit</button>
        </form>
      </RegisterForm>
    </Container>
  );
}
