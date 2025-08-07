import styled from "styled-components";

export const ContainerListItens = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
`;

export const ListItensUl = styled.ul`
  width: 100%;

  

  li {
    font-size: 18px;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.card.text};
    &:hover {
      cursor: pointer;
      border-bottom: 1px solid
        ${({ theme }) => theme.mainColors.secondary};
    }
  }

  li::marker {
color: ${({theme}) => theme.mainColors.text};
  }
`;
