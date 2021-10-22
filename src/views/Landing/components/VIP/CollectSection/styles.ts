import styled from 'styled-components/macro';

export const MainContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  padding: 1.63rem;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @media (max-width: 900px) {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
  }
`;
export const BoxContainer = styled.div`
  max-width: 69.0625rem;
`;
export const GroupedCards = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
export const BigCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
  padding: 2.25rem 3.5rem 3rem 3rem;
  border-radius: 0.5rem;

  @media (max-width: 900px) {
    margin-bottom: 1rem;
    padding: 1.5rem 2rem 2rem 2rem;
  }
`;
export const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  width: 33%;
  margin-right: 1.5rem;
  padding: 2.25rem 3rem 3rem 3rem;
  border-radius: 0.5rem;

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 1rem;
    padding: 1.5rem 2rem 2rem 2rem;
  }
`;

export const CardTitle = styled.div`
  color: white;
  font-size: 2rem;
  line-height: 2.8rem;
  margin-bottom: 2rem;
  font-weight: 400;
  @media (max-width: 900px) {
    font-size: 1.75rem;
  }
`;

export const CardSubtitle = styled.div`
  color: #ddf874;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2.8rem;
  @media (max-width: 900px) {
    font-size: 1.25rem;
    line-height: 2rem;
  }
`;

export const TextBlock = styled.div`
  font-size: 1rem;
  line-heigth: 1.6rem;
  color: white;
  opacity: 0.8;
  margin-bottom: 1rem;
`;
