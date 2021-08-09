import styled from 'styled-components/macro';
export const MenuOptionTitle = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
`;

export const Container = styled.div<{ isOpen: boolean }>`
  color: ${(props) => (props.isOpen ? 'white' : '#7c7c7c')};
  padding-bottom: 16px;
  border-bottom: 1px solid;
  margin-bottom: 40px;
  padding-bottom: 32px;
  width: 100%;
  max-width: 880px;

  @media screen and (max-width: 960px) {
    padding-bottom: 24px;
    margin-bottom: 35px;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  font-family: 'PlusJakartaSans';
  font-weight: 700;
  line-height: 30px;

  @media screen and (max-width: 960px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const Text = styled.div`
  color: #7c7c7c;
  margin-top: 16px;
  font-size: 16px;
  font-family: 'PlusJakartaSans';
  font-weight: 400;
  line-height: 28px;

  @media screen and (max-width: 960px) {
    line-height: 26px;
  }
`;

export const Sign = styled.div`
  font-weight: 700;
  fill: solid;
  line-height: 30px;
  radius: 99px;
  font-size: 24px;
  margin-left: 26px;
  @media screen and (max-width: 960px) {
    font-size: 20px;
  }
`;
