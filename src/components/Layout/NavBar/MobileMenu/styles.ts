import styled from 'styled-components/macro';

export const AcountInfoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Username = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 32px;
  cursor: pointer;
`;

export const AccountIcon = styled.img`
  margin-right: 15px;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const Title = styled.h5`
  margin-bottom: 48px;
`;

export const ListMenu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const AuthButtonsWrapper = styled.div`
  margin-bottom: 40px;
`;
