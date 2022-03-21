import styled from '@emotion/styled';

export const Container = styled.div`
  label {
    font-size: 18px;
    color: ${props=>props.theme.color.textColor};
  }

  p {
    display: ${props => props.showError?'block':'none'};
    margin: 2px;
    color: rgba(255, 0, 0, 0.7);
    font-size: 0.8rem;
  }
`


export const Input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  w:  100%;
  caret-color: white;
  margin-top: 4px;
  margin-bottom: 4px;

  input,
  input:hover,
  input:active,
  imput:focus,
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus
  {
    w:100%;
    margin-left:10px;
    background-color: transparent;
    border: none;
    outline: none !important;
    -webkit-text-fill-color: ${(props) => props.theme.color.textColor};
    font-family: ${(props) => props.theme.fonts.text};
    transition: background-color 5000s ease-in-out 0s;
    flex: 1;
    font-size: 16px;
  }
`;
