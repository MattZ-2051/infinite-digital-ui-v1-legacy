import * as S from './styles';
import styled from 'styled-components/macro';

interface IProps {
  setSelectedTab: (val: string) => void;
  tabOptions: ['History' | 'Auction' | 'Owner Access'];
  setIsMenuVisible: (a: boolean) => void;
}

const TabDropDown = ({
  setSelectedTab,
  tabOptions,
  setIsMenuVisible,
}: IProps) => {
  const handleTabSelect = (tabName: string) => {
    if (tabName === 'Auction') setSelectedTab('auction');
    if (tabName === 'History') setSelectedTab('history');
    if (tabName === 'Owner Access') setSelectedTab('owner_access');
    setIsMenuVisible(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <TabDropDownContainer>
        <S.ButtonContainer>
          {tabOptions instanceof Array &&
            tabOptions.map((tab, index) => {
              return (
                <S.Button
                  hover={true}
                  key={index}
                  width="177px"
                  onClick={() => handleTabSelect(tab)}
                >
                  <S.Label>{tab}</S.Label>
                </S.Button>
              );
            })}
        </S.ButtonContainer>
      </TabDropDownContainer>
    </div>
  );
};

const TabDropDownContainer = styled.div`
position: absolute;
background-color: #252525;
right: 0;
left: 0;
top: 10%;
border-radius: 20px;
display: flex;
width: 177px;
flex-direction: column:
justify-content: center;
align-items: center;
z-index: 1000;
`;

export default TabDropDown;
