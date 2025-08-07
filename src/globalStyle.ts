import "@fontsource/poppins";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400; 
    background-color: ${(props) => props.theme.mainColors.background};
    font-family: "Poppins", sans-serif;
  }
`;