import { useState } from 'react';
import { ITabOptions } from '../tabOptions/ITabOptions';
import * as S from './styles';

const MobileTab = ({ options, setSelectedTab, selectedTab }: ITabOptions) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <S.Container>
      <S.TextAndArrowContainer onClick={() => setIsHidden(!isHidden)}>
        <S.Label>{options[selectedTab]}</S.Label>
        {isHidden ? <S.DownArrow /> : <S.UpArrow />}
      </S.TextAndArrowContainer>
      <>
        {isHidden ? null : (
          <S.HiddenDiv>
            {options.map((option, index) => {
              return (
                <>
                  {options[selectedTab] !== options[index] && (
                    <S.DropDownDiv
                      key={index}
                      onClick={() => {
                        setSelectedTab(index);
                        setIsHidden(true);
                      }}
                      style={{ height: '38px' }}
                    >
                      <p style={{ fontWeight: 400, fontSize: '16px' }}>
                        {option}
                      </p>
                    </S.DropDownDiv>
                  )}
                </>
              );
            })}
          </S.HiddenDiv>
        )}
      </>
    </S.Container>
  );
};

export default MobileTab;
