import { useContext } from "react";
import  ThemeContext  from "../context/emotion-theme";

const useTheme = () => {
  return useContext(ThemeContext)
}


export default useTheme
