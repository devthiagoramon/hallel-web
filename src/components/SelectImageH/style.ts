import styled from "styled-components";

export const SelectImageHContainer = styled.section`
  border: 0.5px solid ${({theme}) => theme.mainColors.border};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  padding: 0 1rem;
  min-height: 48px;
  height: 48px;
  max-height: 48px;
  width: 100%;
  overflow: hidden;
  background-color: transparent;

  input {
    display: none;
  }

  /* label {
    align-self: center;
    font-size: 16px;
    font-weight: 600;
  } */

  hr {
    transform: rotateX("90deg");
  }
`;
