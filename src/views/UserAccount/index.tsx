import styled from 'styled-components/macro';

export interface IProps {}

const UserAccount: React.FC<IProps> = () => {
  return (
    <Container>
      <h2>User Account</h2>
    </Container>
  );
};

const Container = styled.main`
  padding: var(--desktop-view-padding);
`;

export default UserAccount;
