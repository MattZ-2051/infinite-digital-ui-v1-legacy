import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { useState } from 'react';
import FilterArrow from './components/FilterArrow/filterArrow';
import { FilterHamburguer } from './components/FilterHamburguer/filterHamburguer';
import * as S from './styles';

interface IProps {
  options: any; //TODO: change type
  handleSort: (sortValue: 'newest' | 'oldest') => void;
  activeSort: string;
}

const SortByFilter = ({ options, handleSort, activeSort }: IProps) => {
  const [isHidden, setIsHidden] = useState<boolean | undefined>(true);
  const matchesMobile = useMediaQuery('(max-width:950px)', { noSsr: true });
  const getCurrentLabel = () => {
    return options.find((option) => {
      return option.value === activeSort;
    });
  };
  const currentLabel = getCurrentLabel();

  // Delete the current selected from the options
  const getNewOptions = (option) => {
    return option.value !== activeSort;
  };

  const newOptions = options.filter(getNewOptions);

  return (
    <S.Container>
      <div style={{ display: 'flex' }}>
        {!matchesMobile && (
          <>
            <S.SortBy>Sort by:</S.SortBy>
            <S.Label>{currentLabel?.name}</S.Label>
            <FilterArrow isHidden={isHidden} setIsHidden={setIsHidden} />
          </>
        )}
        {matchesMobile && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <S.SortBy>Sort by </S.SortBy>
            <FilterHamburguer isHidden={isHidden} setIsHidden={setIsHidden} />
          </div>
        )}
      </div>
      <>
        {isHidden ? null : (
          <S.HiddenDiv>
            {newOptions instanceof Array &&
              newOptions.map((option, index) => {
                return (
                  <S.DropDownDiv
                    key={option.value}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      handleSort(option.value);
                      setIsHidden(true);
                    }}
                    style={{ height: '38px' }}
                  >
                    <p style={{ fontWeight: 400, fontSize: '16px' }}>
                      {option.name}
                    </p>
                  </S.DropDownDiv>
                );
              })}
          </S.HiddenDiv>
        )}
      </>
    </S.Container>
  );
};

export default SortByFilter;
