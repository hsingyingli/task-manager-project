import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.textColor};
  font-family: ${(props) => props.theme.fonts.text};
  font-weight: 900;
`;

export const ErrorMsg = styled.div`
  display: ${props=>props._display?'block':'none'};
  padding: 10px;
  background-color: rgba(255, 0, 0, 0.2);
  border-radius: 5px;
  margin-bottom: 10px;
  color: rgba(255, 0, 0, 0.6);
  font-size: 14px;
`;

export const SignInForm = styled.section`
  width: 300px;
  backdrop-filter: blur(50px);
  background-color: rgba(49, 61, 87, 0.1);
  box-shadow: 0px 0px 5px ${(props) => props.theme.color.shandowBox};
  border-radius: 10px;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
  }
  

  form > button {
    margin-top: 10px;
    background-color: ${props=> props.theme.color.bgColor};
    border: 1px solid;
    border-radius: 5px;
    border-color: ${props=>props.theme.color.textColor};
    color: ${props=>props.theme.color.textColor};
    height: 24px;
  }
`;

export const Box = styled.div`
  margin-top: 10px;
  font-size: 0.8rem;

  span {
    margin-left: 2px;
    cursor:pointer;
    color: deeppink;
  }

  .link-to-register, 
  .link-to-register:active,
  .link-to-register:hover {
    margin-left: 2px;
    color: deeppink;
  }
`;

