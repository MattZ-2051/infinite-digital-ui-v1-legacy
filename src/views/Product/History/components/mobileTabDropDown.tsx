import * as S from '../styles';
import TabDropDown from '../DropDown/TabDropDown';
import { useState } from 'react';
import { ReactComponent as ArrowIcon } from 'assets/svg/icons/arrow-down-white.svg';
import styled from 'styled-components/macro';

interface IProps {
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
  tabOptions: ['History' | 'Auction' | 'Owner Access'];
  matchesMobile: boolean;
  auctionStatus: string;
}

const getTabText = (tab: string) => {
  if (tab === 'auction') return 'Auction';
  if (tab === 'history') return 'History';
  if (tab === 'owner_access') return 'Owner Access';
};

const MobileDropDown = ({
  selectedTab,
  setSelectedTab,
  tabOptions,
  matchesMobile,
  auctionStatus,
}: IProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const addMarginPadding = matchesMobile
    ? false
    : selectedTab === 'history' ||
      selectedTab === 'owner_access' ||
      auctionStatus.split('-')[0] === 'upcoming';

  return (
    <div style={{ width: '100%' }}>
      <S.FlexDiv
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        padding="0 0 10px 0"
      >
        <S.Text color="white" fontWeight={600} size="18px" padding="0">
          {getTabText(selectedTab)}
        </S.Text>
        <Arrow isMenuVisible={isMenuVisible} />
      </S.FlexDiv>
      {isMenuVisible && (
        <TabDropDown
          setSelectedTab={setSelectedTab}
          tabOptions={tabOptions}
          setIsMenuVisible={setIsMenuVisible}
        />
      )}
    </div>
  );
};

const Arrow = styled(ArrowIcon)<{ isMenuVisible: boolean }>`
  margin-left: 10px;
  ${(props) => props.isMenuVisible && `transform: rotate(180deg)`}
`;

export default MobileDropDown;
