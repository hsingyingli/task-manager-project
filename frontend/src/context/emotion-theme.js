import {createContext, useState} from 'react';
import {ThemeProvider} from '@emotion/react';
import {darkTheme, lightTheme} from '../lib/theme';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background-color: ${props => props.theme.color.bgColor};
  color: ${props=>props.theme.color.textColor};
  font-family: ${props=>props.theme.fonts.text};
`;
const ThemeContext = createContext({});

export function EmotionProvider({children}) {
  const [theme, setTheme] = useState('dark');
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <ThemeProvider theme={currentTheme}>
        <Container>{children}</Container>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
