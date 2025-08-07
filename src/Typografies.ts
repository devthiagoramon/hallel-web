
// ...

import styled from "styled-components";

// A nossa HeadingBase continua a mesma
const HeadingBase = styled.h1`
  color: ${({theme}) => theme.mainColors.text};
  font-weight: 400;
  line-height: 1.2;
  overflow: hidden;
`;

export const H1 = styled(HeadingBase).attrs({ as: 'h1' })`
  font-size: clamp(2rem, 1rem + 5vw, 3.5rem);
  margin-bottom: 1.5rem;
`;

export const H2 = styled(HeadingBase).attrs({ as: 'h2' })`
  font-size: clamp(1.5rem, 1rem + 3vw, 2.5rem);
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const H3 = styled(HeadingBase).attrs({ as: 'h3' })`
  font-size: clamp(1.25rem, 1rem + 1.5vw, 1.75rem);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const Text = styled.p`
  color: ${({theme}) => theme.mainColors.text};
  font-size: clamp(0.9rem, 0.8rem + 0.5vw, 1.1rem);
  line-height: 1.6;
  max-width: 70ch;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-size: clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem);
  color: ${({theme}) => theme.mainColors.text};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;