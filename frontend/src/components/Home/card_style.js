import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 200px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0px 0px 5px ${(props) => props.theme.color.shandowBox};
  padding: 0.8em;
  
  .edit {
    float: right;
    height: 10px;
  }  

  .edit .update,
  .edit .delete {
    cursor: pointer;
  }

  .edit .update {
    margin-right: 5px;
  }

  .description {
    padding-top: 15px;
    font-size: clamp(1.0rem, 2.vw, 2rem);
    min-height: 50px;
    text-align: center;
  }
  .progress-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .progress-bar {
    width: 80%;
  }
`
