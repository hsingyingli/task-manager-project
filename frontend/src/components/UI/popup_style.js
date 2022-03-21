import styled from '@emotion/styled';

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`
export const PopupInner = styled.div`
  max-width: 640px;
  min-height: 100px;
  padding: 1em;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0px 0px 5px ${(props) => props.theme.color.shandowBox};
  background-color: ${props => props.theme.color.bgColor};

  .close {
    float: right;
    cursor: pointer;
  }
  

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
    width: 100%;
  }
`
