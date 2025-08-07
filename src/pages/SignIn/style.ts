import styled from "styled-components";

export const SignContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  .go_back {
    position: absolute;
    left: 2rem;
    top: 2rem;
  }
`;

export const FormContainer = styled.form`
  width: 30%;
  overflow: hidden;

  main {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin-bottom: 1.5rem;
  }

  section {
    display: flex;
    width: 100%;
    flex-direction: row;
    .rigth {
      width: 100%;
      justify-self: flex-end;
      color: ${({ theme }) => theme.mainColors.secondary};
      text-align: end;
    }
  }
  footer {
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    width: 100%;

    p {
      text-align: center;
      align-items: center;
      span{
        color: ${({theme}) => theme.mainColors.secondary};
        font-size: clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem);
      }
    }
  }

   @media (max-width: 1156px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 70%;
  }
`;
