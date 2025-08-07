// src/components/Divider.js
import React, { type ReactNode } from 'react';
import styled from 'styled-components';

// Este é o nosso container principal que usará Flexbox.
const DividerContainer = styled.div`
  display: flex;
  align-items: center; /* Alinha verticalmente o texto e as linhas */
  text-align: center;
  margin: 1.5rem 0; /* Espaçamento vertical para o componente respirar */

  /* Estiliza o texto (children) que fica no meio */
  & > span {
    padding: 0 1rem; /* Espaçamento horizontal para separar o texto das linhas */
    font-size: 0.9rem;
    color: ${({theme}) => theme.mainColors.border};
    font-weight: 500;
  }

  /* Cria as linhas antes e depois do texto */
  &::before,
  &::after {
    content: ''; /* Essencial para que os pseudo-elementos apareçam */
    flex-grow: 1; /* A MÁGICA: faz as linhas crescerem para ocupar o espaço disponível */
    height: 1px; /* A espessura da linha */
    background-color: ${({theme}) => theme.mainColors.border}; /* A cor da linha */
  }
`;

/**
 * Componente de Divisor com texto no meio.
 * @param {object} props
 * @param {React.ReactNode} props.children - O texto a ser exibido no meio do divisor.
 */
const DividerWithText = ({text}: {text: string}) => {
  return (
    <DividerContainer>
      {text && <span>{text}</span>}
    </DividerContainer>
  );
};

export default DividerWithText;