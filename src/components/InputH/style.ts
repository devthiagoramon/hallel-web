import styled from "styled-components";

export const InputH = styled.input<{
  $type: "contained" | "outlined";
}>`
  min-height: 46px;
  max-width: 100%;
  width: 100%;
  border-radius: ${(props) =>
    props.$type === "outlined" ? "8px" : "6px"};
  outline-width: 1px;
  padding: 8px 16px;
  font-size: 16px;
  border: ${(props) =>
    props.theme.mainColors.text ? "solid" : "none"};
  border-color: ${(props) => props.theme.mainColors.border};
  border-style: ${(props) =>
    props.$type === "outlined"
      ? "hidden hidden solid hidden"
      : "solid"};
  border-width: ${(props) =>
    props.$type === "outlined" ? "1px" : "0.5px"};
  &:focus {
    border: #00a6f4 1px solid;
    outline: none;
  }
  background-color: ${(props) =>
    props.$type === "contained" ? "transparent" : "transparent"};
`;

export const InputIconContainerH = styled.div<{
  $startIcon: boolean;
  $endIcon: boolean;
  $type: "contained" | "outlined";
  $inputFocus: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 100%;
  width: 100%;
  column-gap: ${(props) =>
    props.$startIcon || props.$endIcon ? "16px" : "0px"};
  padding: 8px 12px;
  font-size: 16px;
  min-height: 46px;
  border-radius: ${(props) =>
    props.$type === "outlined" ? "0" : "6px"};
  border: ${(props) =>
    props.theme.mainColors.text ? "solid" : "none"};
  border-color: ${(props) => !!props.$inputFocus ? "#00a6f4" : props.theme.mainColors.border};
  border-style: ${(props) =>
    props.$type === "outlined"
      ? "hidden hidden solid hidden"
      : "solid"};
  border-width: 1px;


  input {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    background-color: transparent;
    width: 100%;
    max-width: 100%;
    height: 100%;
  }

  svg,
  img {
    max-height: 24px;
    max-width: 24px;
  }
`;
