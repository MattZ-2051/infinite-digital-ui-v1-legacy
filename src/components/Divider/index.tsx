import styled from 'styled-components/macro';

export interface IProps {
  children: React.ReactChild[];
  gap: number;
}

const Divider: React.FC<IProps> = ({ gap, children }) => {
  return <Container style={{ ['--gap' as string]: `${gap}px` }}>{children}</Container>;
};

const Container = styled.nav`
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: var(--gap);
  grid-auto-columns: max-content;
`;

export default Divider;
