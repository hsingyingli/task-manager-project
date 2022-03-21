import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .create-task{ 
    margin-top: 10px;
    background-color: ${props=> props.theme.color.bgColor};
    border: 1px solid;
    border-radius: 5px;
    border-color: ${props=>props.theme.color.textColor};
    color: ${props=>props.theme.color.textColor};
    height: 24px;
  }
`;

export const Main = styled.div`
  width: min(100%, 48em);
  margin: 0 auto;
`;

export const Info = styled.div`
  .name {
    font-size: clamp(1.6rem, 3vw, 4.5rem);
  }
  .caption {
    font-size: 1.rem;
    margin-bottom: 0;
  }
`;

export const Tasks = styled.div`
  margin-top: 2rem;
  place-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 1em;
`;
