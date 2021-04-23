import styled from 'styled-components/macro';

interface IProps {
  existingCard?: boolean;
}

const CCDeposit = ({ existingCard }: IProps) => {
  return <div>Deposit</div>;
};

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default CCDeposit;
