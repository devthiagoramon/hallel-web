import "@fontsource/poppins";
import styled from "styled-components";

export const GlobalStyle = styled.div`
  * {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
  body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.mainColors.background};
    font-family: "Poppins", sans-serif;
  }
`;
