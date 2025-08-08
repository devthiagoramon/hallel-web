import styled from "styled-components";

export const AdmSignUpContainer = styled.main`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormSignUpContainer = styled.form`
  padding: 1.875rem;
  border-radius: 0.5rem;
  width: 40%;
  height: 50%;
  display: grid;
  grid-template-columns: 100%;
  row-gap: 1rem;
  background-color: ${(props) =>
    props.theme.mainColors.backgroundGrey};
`;

export const SignUpAdministratorVerification = styled.div`
  padding: 1.875rem;
  border-radius: 0.5rem;
  width: 40%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
`