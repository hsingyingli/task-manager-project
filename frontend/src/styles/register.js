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
  color: rgba(255, 0, 0, 0.6);
  display: ${props=>props._display?'block':'none'};
  padding: 20px;
`;

export const RegisterForm = styled.section`
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
    border-color: ${props=>props.isValid?'#008080': 'grey'};
    color: ${props=>props.isValid?props.theme.color.textColor:'grey'};
    pointer-events: ${props=>props.isValid?'auto':'none'};
    height: 24px;
  }
`;
