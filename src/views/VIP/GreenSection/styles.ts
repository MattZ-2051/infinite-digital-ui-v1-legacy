import styled from 'styled-components/macro';

export const MainContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  padding: 1.63rem;
  padding-top: 8rem;
  padding-bottom: 5rem;
  @media (max-width: 1300px) {
    padding-left: 0;
    padding-right: 0;
  }
  @media (max-width: 900px) {
    padding-bottom: 0px;
    padding-top: 2.5rem;
  }
`;
export const BoxContainer = styled.div`
  max-width: 84rem;
  width: 100%;
  background-color: #ddf874;
  padding: 5rem 5.6rem 5rem 5.6rem;
  @media (max-width: 1150px) {
    padding: 5rem 1.63rem 5rem 1.63rem;
  }
`;
export const BoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Box = styled.div`
  width: 33%;
  margin-right: 2.5rem;
  padding-top: 1rem;
  border-top: 2px solid black;
  text-align: center;
  @media (max-width: 700px) {
    width: 100%;
    margin-bottom: 2.75rem;
    padding-top: 1.25rem;
  }
`;

export const Title = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  @media (max-width: 700px) {
    margin-bottom: 5rem;
  }
`;
