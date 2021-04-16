import styled from 'styled-components/macro';
import { ReactComponent as CloseIcon } from 'assets/svg/icons/close-modal.svg';

export interface IProps {
  isVisible: boolean;
}

const Toast: React.FC<IProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <Container>
      <div>
        This is a simple error message. Can we help you to{' '}
        <a style={{ color: 'black' }}>fix the problem?</a>
      </div>
      <CloseButton>
        <CloseIcon style={{ width: '32px', height: '32px' }} />
      </CloseButton>
    </Container>
  );
};

const Container = styled.div`
  height: 64px;
  color: white;
  background: linear-gradient(89.89deg, #fb5543 0%, #f24c66 100%), #fc5746;
  padding: 0 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default Toast;
