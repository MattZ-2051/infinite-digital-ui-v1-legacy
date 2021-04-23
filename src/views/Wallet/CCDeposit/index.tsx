<<<<<<< HEAD
import styled from "styled-components/macro";
=======
import styled from 'styled-components/macro';
>>>>>>> development

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

<<<<<<< HEAD
export const Container = styled.div`
=======
export const Container = styled.main`
>>>>>>> development
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default CCDeposit;
