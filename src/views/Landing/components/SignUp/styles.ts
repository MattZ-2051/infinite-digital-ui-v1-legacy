import styled from 'styled-components/macro';

export const S: any = {};

S.Container = styled.div`
  height: 50vh;
  background-color: black;
`;

S.Header = styled.h1`
  font-weight: 700;
  font-size: 56px;
  color: white;
  padding-top: 32px;
  text-align: center;
`;

S.SubHeader = styled.h3`
  font-weight: 500;
  font-size: 28px;
  color: #8e8e8e;
  text-align: center;
  padding-top: 16px;
`;

S.Button = styled.button`
  width: 218px;
  height: 56px;
  background-color: white;
  color: black;
  font-weight: 700;
  font-size: 20px;
  border-radius: 35px;
  border: none;
  :focus {
    outline: none;
  }
`;

S.FlexCenter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 40px;
`;
