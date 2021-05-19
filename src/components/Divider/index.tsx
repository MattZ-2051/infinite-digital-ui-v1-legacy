import React from 'react';
import styled from 'styled-components/macro';

export interface IProps {
  children: React.ReactNode | false;
  gap: number;
  tag?: 'div' | 'span' | 'nav';
}

const Divider = ({ children, gap, tag = 'div' }: IProps) => {
  return (
    <Container as={tag as any} style={{ ['--gap' as string]: `${gap}px` }}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: var(--gap);
`;

export default Divider;
