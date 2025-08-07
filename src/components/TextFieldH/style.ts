import styled from "styled-components";

export const TextFieldHContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
  label {
    color: ${(props) => props.theme.mainColors.text};
    font-weight: 500;
    font-size: 18px;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  /* input,
  div,
  section {
    margin-top: 8px;
  } */
`;
