import styled from 'styled-components/macro';
export interface IProps {}

const Filters: React.FC<IProps> = () => {
  return <Container>All Released Upcoming No one selling</Container>;
};

const Container = styled.div`
  width: 100%;
  background-color: #bbbbbb;
  border: 1px solid #7614e6;

  /* @media screen and (min-width: 1140px) {
    display: none;
  } */
`;
export default Filters;
