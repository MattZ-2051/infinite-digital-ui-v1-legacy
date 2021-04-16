import styled from 'styled-components/macro';
import { ReactComponent as CloseIcon } from 'assets/svg/icons/close-modal.svg';

export interface IProps {
  isVisible: boolean;
  status: 'error' | 'success';
}

const Toast: React.FC<IProps> = ({ children, isVisible, status }) => {
  if (!isVisible) return null;

  return (
    <Container status={status}>
      <div>{children}</div>
      <CloseButton>
        <CloseIcon style={{ width: '32px', height: '32px' }} />
      </CloseButton>
    </Container>
  );
};

interface IContainer {
  status: 'success' | 'error';
}

const Container = styled.div<IContainer>`
  height: 64px;
  color: #000000;
  background: ${(props) =>
    props.status === 'error'
      ? 'linear-gradient(89.89deg, #fb5543 0%, #f24c66 100%), #fc5746;'
      : 'linear-gradient(89.89deg, #00EB7C 0%, #11D6EC 100%);'};
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
