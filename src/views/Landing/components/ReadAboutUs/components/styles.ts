import styled from 'styled-components/macro';

export const Container = styled.div<{ isWhite: boolean }>`
  max-width: 764px;
  border-bottom: solid 1px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  font-family: 'PlusJakartaSans';
  color: ${(props) => (props.isWhite ? 'white' : '#7c7c7c')};
  @media screen and (max-width: 960px) {
    padding-bottom: 30px;
    margin-bottom: 40px;
  }
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 8px;
`;

export const Text = styled.div`
  width: max-content;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  max-width: 556px;
  @media screen and (max-width: 960px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const Row = styled.div<{ isWhite: boolean }>`
  color: ${(props) => (props.isWhite ? 'white' : 'grey')};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ReadMore = styled.div``;

export const Button = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: 700;
  font-size: 16px;
  line-height: 13px;
  cursor: pointer;
  margin-left: 10px;
  @media screen and (max-width: 960px) {
    margin-top: 29px;
  }
`;

export const Icon = styled.div`
  margin-left: 13px;
`;
